import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Vibration, View} from 'react-native';
import RCModal from 'react-native-modal';
import {Button, RadioButton, Subheading, Text} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {Digits} from '../../../components/discount/digits';
import {DiscountType, Display} from '../../../components/discount/display';
import i18n from '../../../helpers/i18n';
import {
  ceil,
  equals,
  floor,
  isConstantPrefix,
  isDigit,
  isDigitOrSymbol,
  isError,
  isOp,
  negate,
  percent,
  round,
  speakInput,
  trunc,
} from '../../../helpers/math';
import {
  calcGeneralDiscountOptions,
  calculatorDiscountOptions,
  getCalculatorKeyFromValue,
} from '../../../helpers/pickers';
import {getCalcTheme, ThemeContext} from '../../../helpers/themes';
import {analButton, getFont, setData} from '../../../helpers/utils';
import {RootState} from '../../../redux';
import {setCalculator} from '../../../redux/calculator';
import {
  DiscountState,
  setActiveRow,
  setDiscount,
  setDiscount1,
  setDiscount2,
  setDiscount3,
  setFixedPrice,
  setNumProducts,
  setPrevActiveRow,
  setPrice,
  setProduct1,
  setProduct2,
  setProduct3,
  setProduct4,
  setTax,
  setUnitPrice,
} from '../../../redux/discount';

type Props = DiscountState & {
  ctheme: number;
  decSep: string;
  font: number;
  radians: boolean;
  speech: boolean;
  vibrate: boolean;
  setActiveRow: ActionCreatorWithPayload<unknown, string>;
  setCalculator: ActionCreatorWithPayload<unknown, string>;
  setDiscount: ActionCreatorWithPayload<unknown, string>;
  setDiscount1: ActionCreatorWithPayload<unknown, string>;
  setDiscount2: ActionCreatorWithPayload<unknown, string>;
  setDiscount3: ActionCreatorWithPayload<unknown, string>;
  setFixedPrice: ActionCreatorWithPayload<unknown, string>;
  setNumProducts: ActionCreatorWithPayload<unknown, string>;
  setPrevActiveRow: ActionCreatorWithPayload<unknown, string>;
  setPrice: ActionCreatorWithPayload<unknown, string>;
  setProduct1: ActionCreatorWithPayload<unknown, string>;
  setProduct2: ActionCreatorWithPayload<unknown, string>;
  setProduct3: ActionCreatorWithPayload<unknown, string>;
  setProduct4: ActionCreatorWithPayload<unknown, string>;
  setTax: ActionCreatorWithPayload<unknown, string>;
  setUnitPrice: ActionCreatorWithPayload<unknown, string>;
};

const mapStateToProps = (state: RootState) => ({
  ...state.discount,
  ctheme: state.config.theme,
  decSep: state.config.decSep,
  discountPurchased: state.purchases.discount,
  radians: state.config.radians,
  speech: state.config.speech,
  vibrate: state.config.vibrate,
});

const mapDispatchToProps = {
  setActiveRow,
  setCalculator,
  setDiscount,
  setDiscount1,
  setDiscount2,
  setDiscount3,
  setFixedPrice,
  setNumProducts,
  setPrevActiveRow,
  setPrice,
  setProduct1,
  setProduct2,
  setProduct3,
  setProduct4,
  setTax,
  setUnitPrice,
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    padding: wp(5),
  },
  modalEntry: {flexDirection: 'row', paddingBottom: wp(1)},
  modalSubheading: {paddingBottom: wp(2)},
  modalText: {paddingTop: wp(1.8)},
});

export const DiscountCalculator = connect(
  mapStateToProps,
  mapDispatchToProps,
)(function (props: Props) {
  const {
    activeRow,
    ctheme,
    decSep,
    discount,
    discount1,
    discount2,
    discount3,
    fixedPrice,
    numProducts,
    prevActiveRow,
    price,
    product1,
    product2,
    product3,
    product4,
    radians,
    speech,
    tax,
    type,
    unitPrice,
    vibrate,
    setActiveRow,
    setCalculator,
    setDiscount,
    setDiscount1,
    setDiscount2,
    setDiscount3,
    setFixedPrice,
    setNumProducts,
    setPrevActiveRow,
    setPrice,
    setProduct1,
    setProduct2,
    setProduct3,
    setProduct4,
    setTax,
    setUnitPrice,
  } = props;

  const [brackets, setBrackets] = useState(0);
  const [modalMenuVisible, setModalMenuVisible] = useState(false);

  const backspace = () => {
    const output = getOutput(activeRow);

    if (!output) {
      return;
    }

    const lastChar = output.slice(-1);

    switch (lastChar) {
      case '(':
        setBrackets(brackets - 1);
        break;

      case ')':
        setBrackets(brackets + 1);
        break;

      default:
    }

    const l = output.length;

    if (l === 1) {
      clear();
    }

    return l > 1 ? output.slice(0, l - 1) : '0';
  };

  const bracket = () => {
    const output = getOutput(activeRow);

    if (!output) {
      return;
    }

    if (output === '0') {
      setBrackets(brackets + 1);
      return '(';
    }

    const lastChar = output.slice(-1);

    if ((isDigit(lastChar) || isConstantPrefix(output)) && brackets === 0) {
      setBrackets(brackets + 1);
      return `${output}(`;
    }

    switch (lastChar) {
      case '÷':
      case '×':
      case '+':
      case '−':
      case '^':
      case '%':
      case '(':
        setBrackets(brackets + 1);
        return `${output}(`;

      case decSep:
        return output;

      default:
    }

    if (brackets > 0) {
      setBrackets(brackets - 1);
      return `${output})`;
    }

    return output;
  };

  const clear = () => {
    setBrackets(0);
    setModalMenuVisible(false);
    setOutput(activeRow, '0');
  };

  const getOutput = (row: number) => {
    switch (row) {
      default:
      case 2:
        return price.toString();
      case 3:
        return discount.toString();
      case 4:
        return tax.toString();
      case 5:
        return product1.toString();
      case 6:
        return product2.toString();
      case 7:
        return product3.toString();
      case 8:
        return product4.toString();
      case 9:
        return discount1.toString();
      case 10:
        return discount2.toString();
      case 11:
        return discount3.toString();
      case 12:
        return numProducts.toString();
      case 13:
        return unitPrice.toString();
      case 14:
        return fixedPrice.toString();
    }
  };

  const onLongPress = (key: string | undefined) => {
    switch (key) {
      case 'backspace-outline':
        speakInput(i18n.t('calc.op_clear'), speech);
        clear();
        break;
      default:
    }
  };

  const onMenuPress = () => {
    setModalMenuVisible(true);
  };

  const onPress = (key: string | undefined) => {
    analButton(key, decSep);

    if (activeRow === 0) {
      return;
    }

    const output = getOutput(activeRow);

    const simpleOp = (symbol: string) => {
      setOutput(activeRow, isOpLastChar ? output : `${output}${symbol}`);
    };

    if (isError(output)) {
      clear();
      return;
    }

    if (vibrate) {
      Vibration.vibrate(32);
    }

    const lastChar = output.slice(-1);

    if (isDigit(key) || key === '00') {
      key && speakInput(key, speech);
      setOutput(activeRow, output === '0' ? key : `${output}${key}`);
      return;
    }

    const isOpLastChar = isOp(lastChar);

    const setNextActiveRow = () => {
      let next = activeRow;

      switch (type) {
        case DiscountType.PercentageOff:
        case DiscountType.FixedAmountOff:
          if (activeRow === 4) {
            next = 1;
          } else {
            next += 1;
          }
          break;
        case DiscountType.PercentageOff2ndProduct:
          if (activeRow === 1) {
            next = 3;
          } else if (activeRow === 3) {
            next = 5;
          } else if (activeRow === 4) {
            next = 1;
          } else if (activeRow === 6) {
            next = 4;
          } else {
            next += 1;
          }
          break;
        case DiscountType.PercentageOff3rdProduct:
          if (activeRow === 1) {
            next = 3;
          } else if (activeRow === 3) {
            next = 5;
          } else if (activeRow === 4) {
            next = 1;
          } else if (activeRow === 7) {
            next = 4;
          } else {
            next += 1;
          }
          break;
        case DiscountType.TwoForOne:
          if (activeRow === 1) {
            next = 5;
          } else if (activeRow === 4) {
            next = 1;
          } else if (activeRow === 6) {
            next = 4;
          } else {
            next += 1;
          }
          break;
        case DiscountType.ThreeForTwo:
          if (activeRow === 1) {
            next = 5;
          } else if (activeRow === 4) {
            next = 1;
          } else if (activeRow === 7) {
            next = 4;
          } else {
            next += 1;
          }
          break;
        case DiscountType.FourForThree:
          if (activeRow === 1) {
            next = 5;
          } else if (activeRow === 4) {
            next = 1;
          } else if (activeRow === 8) {
            next = 4;
          } else {
            next += 1;
          }
          break;
        case DiscountType.DoubleDiscount:
          if (activeRow === 2) {
            next = 9;
          } else if (activeRow === 4) {
            next = 1;
          } else if (activeRow === 10) {
            next = 4;
          } else {
            next += 1;
          }
          break;
        case DiscountType.TripleDiscount:
          if (activeRow === 2) {
            next = 9;
          } else if (activeRow === 4) {
            next = 1;
          } else if (activeRow === 11) {
            next = 4;
          } else {
            next += 1;
          }
          break;
        case DiscountType.MultipleDiscount:
          if (activeRow === 1) {
            next = 12;
          } else if (activeRow === 4) {
            next = 1;
          } else if (activeRow === 14) {
            next = 4;
          } else {
            next += 1;
          }
          break;
        default:
      }

      setActiveRow(next);
    };

    switch (key) {
      case '×':
      case '+':
      case '−':
      case '÷':
        speakInput(i18n.t(`calc.op_${key}`), speech);
        simpleOp(key);
        break;

      case '%':
        if (output && output !== '0' && !isOpLastChar) {
          speakInput(key, speech);

          const output2 = percent(output, {radians});
          setOutput(activeRow, output2);
        }
        break;

      case '( )':
        speakInput(i18n.t('calc.op_brackets'), speech);
        setOutput(activeRow, bracket());
        break;

      case decSep:
        if (!isOpLastChar) {
          speakInput(i18n.t('calc.op_point'), speech);
          setOutput(activeRow, `${output}.`);
        }
        break;

      case '▼':
        speakInput(i18n.t('calc.op_next'), speech);
        setPrevActiveRow(activeRow);
        setNextActiveRow();
        break;

      case '←':
      case 'backspace-outline':
        speakInput(i18n.t('calc.op_back'), speech);
        setOutput(activeRow, backspace());
        break;

      case i18n.t('calc.ceil'):
        speakInput(i18n.t('calc.op_ceiling'), speech);
        setOutput(activeRow, ceil(output));
        break;

      case i18n.t('calc.floor'):
        speakInput(i18n.t('calc.op_floor'), speech);
        setOutput(activeRow, floor(output));
        break;

      case '±':
      case i18n.t('calc.neg'):
        speakInput(i18n.t('calc.neg'), speech);
        setOutput(activeRow, negate(output) || output);
        break;

      case i18n.t('calc.round'):
        speakInput(i18n.t('calc.op_rounded'), speech);
        setOutput(activeRow, round(output));
        break;

      case i18n.t('calc.trunc'):
        speakInput(i18n.t('calc.op_trunc'), speech);
        setOutput(activeRow, trunc(output));
        break;

      default:
    }
  };

  const setOutput = (row: number, value = '') => {
    if (!value) {
      return;
    }

    switch (row) {
      default:
      case 2:
        if (!isError(value)) {
          setData('disc_price', value);
          setPrice(value);
        }
        break;
      case 3:
        if (!isError(discount)) {
          setData('disc_discount', value);
          setDiscount(value);
        }
        break;
      case 4:
        if (!isError(value)) {
          setData('disc_tax', value);
          setTax(value);
        }
        break;
      case 5:
        if (!isError(value)) {
          setData('disc_product1', value);
          setProduct1(value);
        }
        break;
      case 6:
        if (!isError(value)) {
          setData('disc_product2', value);
          setProduct2(value);
        }
        break;
      case 7:
        if (!isError(value)) {
          setData('disc_product3', value);
          setProduct3(value);
        }
        break;
      case 8:
        if (!isError(value)) {
          setData('disc_product4', value);
          setProduct4(value);
        }
        break;
      case 9:
        if (!isError(value)) {
          setData('disc_discount1', value);
          setDiscount1(value);
        }
        break;
      case 10:
        if (!isError(value)) {
          setData('disc_discount2', value);
          setDiscount2(value);
        }
        break;
      case 11:
        if (!isError(value)) {
          setData('disc_discount3', value);
          setDiscount3(value);
        }
        break;
      case 12:
        if (!isError(value)) {
          setData('disc_numProducts', value);
          setNumProducts(value);
        }
        break;
      case 13:
        if (!isError(value)) {
          setData('disc_unitPrice', value);
          setUnitPrice(value);
        }
        break;
      case 14:
        if (!isError(value)) {
          setData('disc_fixedPrice', value);
          setFixedPrice(value);
        }
        break;
    }
  };

  useEffect(() => {
    if (prevActiveRow === -1) {
      return;
    }

    const output = getOutput(prevActiveRow);
    const l = output.length;

    if (!output || (l < 3 && !isConstantPrefix(output))) {
      return;
    }

    const lastChar = output.slice(-1);

    if (
      brackets === 0 &&
      (isDigitOrSymbol(lastChar, ')') || isConstantPrefix(output))
    ) {
      const output2 = equals(output, {
        log: false,
        radians,
      });

      setOutput(prevActiveRow, output2);
      setBrackets(0);
    }
  }, [prevActiveRow]);

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {color, modal, primary} = theme;

        const {backgroundColor} = getCalcTheme(ctheme);

        const fontFamily = getFont();
        const fontFamilyBold = getFont(true);

        const calculatorOptions = calculatorDiscountOptions();

        return (
          <>
            <View style={{backgroundColor, flex: 1}}>
              <Display />
              <View style={{paddingLeft: wp(2)}}>
                <Digits
                  onLongPress={onLongPress}
                  onMenuPress={onMenuPress}
                  onPress={onPress}
                  theme={ctheme}
                />
              </View>
            </View>
            <RCModal
              isVisible={modalMenuVisible}
              onBackButtonPress={() => {
                setModalMenuVisible(false);
              }}
              onBackdropPress={() => {
                setModalMenuVisible(false);
              }}>
              <ScrollView
                contentContainerStyle={[
                  styles.modalContainer,
                  {backgroundColor: modal},
                ]}>
                <Subheading
                  style={[
                    styles.modalSubheading,
                    {color: primary, fontFamily: fontFamilyBold},
                  ]}>
                  {i18n.t('calc.adv7')}
                </Subheading>
                <RadioButton.Group
                  onValueChange={button => {
                    const calculator = getCalculatorKeyFromValue(button);
                    setCalculator(calculator);
                    setModalMenuVisible(false);
                  }}
                  value="">
                  {calculatorOptions.map((t: string) => (
                    <View key={t} style={styles.modalEntry}>
                      {/* 
                // @ts-ignore */}
                      <RadioButton.Android
                        color={color}
                        status="unchecked"
                        style={{alignContent: 'center'}}
                        value={t}
                      />
                      <Text style={[styles.modalText, {fontFamily}]}>{t}</Text>
                    </View>
                  ))}
                </RadioButton.Group>
                <View style={{marginVertical: wp(2)}} />
                <Subheading
                  style={[
                    styles.modalSubheading,
                    {color: primary, fontFamily: fontFamilyBold},
                  ]}>
                  {i18n.t('calc.adv')}
                </Subheading>
                <RadioButton.Group
                  onValueChange={button => {
                    onPress(button);
                    setModalMenuVisible(false);
                  }}
                  value="">
                  {calcGeneralDiscountOptions.map((t: string) => (
                    <View key={t} style={styles.modalEntry}>
                      {/* 
                // @ts-ignore */}
                      <RadioButton.Android
                        color={color}
                        status="unchecked"
                        style={{alignContent: 'center'}}
                        value={t}
                      />
                      <Text style={[styles.modalText, {fontFamily}]}>{t}</Text>
                    </View>
                  ))}
                </RadioButton.Group>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {/* 
                // @ts-ignore */}
                  <Button
                    compact={true}
                    onPress={() => {
                      setModalMenuVisible(false);
                    }}
                    testID="btn-cancel"
                    uppercase={false}>
                    {i18n.t('dialog.btnCancel')}
                  </Button>
                </View>
              </ScrollView>
            </RCModal>
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
});
