import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React, {useEffect, useRef, useState} from 'react';
import {
  LayoutRectangle,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RCModal from 'react-native-modal';
import {Button, RadioButton, Subheading} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import i18n, {currencySymbol} from '../../../helpers/i18n';
import {
  discountTypeOptions,
  getDiscountTypeFromKey,
  getDiscountTypeKeyFromValue,
} from '../../../helpers/pickers';
import {ThemeContext} from '../../../helpers/themes';
import {anal, formatOutput, getFont} from '../../../helpers/utils';
import {RootState} from '../../../redux';
import {
  DiscountState,
  setActiveRow,
  setPay,
  setPrevActiveRow,
  setSave,
  setType,
} from '../../../redux/discount';

export enum DiscountType {
  PercentageOff = 1,
  PercentageOff2ndProduct = 2,
  PercentageOff3rdProduct = 3,
  FixedAmountOff = 4,
  TwoForOne = 5,
  ThreeForTwo = 6,
  FourForThree = 7,
  DoubleDiscount = 8,
  TripleDiscount = 9,
  MultipleDiscount = 10,
}

type Props = DiscountState & {
  decSep: string;
  negRed: boolean;
  thouSep: string;
  setActiveRow: ActionCreatorWithPayload<unknown, string>;
  setPay: ActionCreatorWithPayload<unknown, string>;
  setPrevActiveRow: ActionCreatorWithPayload<unknown, string>;
  setSave: ActionCreatorWithPayload<unknown, string>;
  setType: ActionCreatorWithPayload<unknown, string>;
};

const styles = StyleSheet.create({
  caption: {
    fontSize: wp(3),
  },
  heading: {
    fontSize: wp(5),
    paddingLeft: wp(8),
    paddingRight: wp(5),
    paddingVertical: wp(2),
  },
  modalContainer: {
    justifyContent: 'center',
    padding: wp(5),
  },
  modalEntry: {flexDirection: 'row', paddingBottom: wp(1)},
  modalSubheading: {paddingBottom: wp(2)},
  modalText: {paddingTop: wp(1.8)},
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  rowLeft: {justifyContent: 'center', width: '20%'},
  rowRight: {justifyContent: 'center', width: '80%'},
  switchLeft: {
    alignItems: 'flex-start',
    flex: 1.5,
  },
  switchRight: {
    alignItems: 'flex-end',
    flex: 1,
  },
  switchView: {
    alignItems: 'center',
    borderWidth: 0,
    flexDirection: 'row',
    padding: wp(4),
  },
  text: {
    fontSize: wp(4),
  },
  textSum: {
    fontSize: wp(4.25),
  },
});

const mapStateToProps = (state: RootState) => ({
  ...state.discount,
  decSep: state.config.decSep,
  negRed: state.config.negRed,
  thouSep: state.config.thouSep,
});

const mapDispatchToProps = {
  setActiveRow,
  setPay,
  setPrevActiveRow,
  setSave,
  setType,
};

export const Display = connect(
  mapStateToProps,
  mapDispatchToProps,
)(function (props: Props) {
  const {
    activeRow,
    decSep,
    discount,
    discount1,
    discount2,
    discount3,
    fixedPrice,
    numProducts,
    negRed,
    pay,
    price,
    product1,
    product2,
    product3,
    product4,
    save,
    tax,
    type,
    thouSep,
    unitPrice,
    setActiveRow,
    setPay,
    setPrevActiveRow,
    setSave,
    setType,
  } = props;

  const scrollRef: React.MutableRefObject<ScrollView | null> = useRef(null);

  const [modalTypeVisible, setModalTypeVisible] = useState(false);

  const [layout1, setLayout1] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout2, setLayout2] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout3, setLayout3] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout4, setLayout4] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout5, setLayout5] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout6, setLayout6] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout7, setLayout7] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout8, setLayout8] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout9, setLayout9] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout10, setLayout10] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout11, setLayout11] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout12, setLayout12] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout13, setLayout13] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [layout14, setLayout14] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const fontFamily = getFont();
  const fontFamilyBold = getFont(true);

  const negativePrice = negRed && Number(price) < 0;
  const formattedPrice = `${currencySymbol}${formatOutput(
    price,
    decSep,
    thouSep,
  )}`;

  const negativeDiscount = negRed && Number(discount) < 0;
  const formattedDiscount =
    type === DiscountType.FixedAmountOff
      ? `${currencySymbol}${formatOutput(discount, decSep, thouSep)}`
      : `${formatOutput(discount, decSep, thouSep)}%`;

  const negativeTax = negRed && Number(tax) < 0;
  const formattedTax = `${formatOutput(tax, decSep, thouSep)}%`;

  const negativePay = negRed && Number(pay) < 0;
  const formattedPay = `${currencySymbol}${formatOutput(pay, decSep, thouSep)}`;

  const negativeSave = negRed && Number(save) < 0;
  const formattedSave = `${currencySymbol}${formatOutput(
    save,
    decSep,
    thouSep,
  )}`;

  const negativeProduct1 = negRed && Number(product1) < 0;
  const formattedProduct1 = `${currencySymbol}${formatOutput(
    product1,
    decSep,
    thouSep,
  )}`;

  const negativeProduct2 = negRed && Number(product2) < 0;
  const formattedProduct2 = `${currencySymbol}${formatOutput(
    product2,
    decSep,
    thouSep,
  )}`;

  const negativeProduct3 = negRed && Number(product3) < 0;
  const formattedProduct3 = `${currencySymbol}${formatOutput(
    product3,
    decSep,
    thouSep,
  )}`;

  const negativeProduct4 = negRed && Number(product4) < 0;
  const formattedProduct4 = `${currencySymbol}${formatOutput(
    product4,
    decSep,
    thouSep,
  )}`;

  const negativeDiscount1 = negRed && Number(discount1) < 0;
  const formattedDiscount1 = `${formatOutput(discount1, decSep, thouSep)}%`;

  const negativeDiscount2 = negRed && Number(discount2) < 0;
  const formattedDiscount2 = `${formatOutput(discount2, decSep, thouSep)}%`;

  const negativeDiscount3 = negRed && Number(discount3) < 0;
  const formattedDiscount3 = `${formatOutput(discount3, decSep, thouSep)}%`;

  const negativeFixedPrice = negRed && Number(fixedPrice) < 0;
  const formattedFixedPrice = `${currencySymbol}${formatOutput(
    fixedPrice,
    decSep,
    thouSep,
  )}`;

  const negativeUnitPrice = negRed && Number(unitPrice) < 0;
  const formattedUnitPrice = `${currencySymbol}${formatOutput(
    unitPrice,
    decSep,
    thouSep,
  )}`;

  const negativeNumProducts = negRed && Number(numProducts) < 0;
  const formattedNumProducts = `${formatOutput(numProducts, decSep, thouSep)}`;

  const discountTypeValue = getDiscountTypeFromKey(type);

  const calculateTotals = () => {
    const reset = () => {
      setPay('0');
      setSave('0');
    };

    const taxNum = Number(tax) || 0;

    if (taxNum < 0) {
      reset();
      return;
    }

    let priceNum;
    let discountNum;

    let payNum;
    let payBeforeDiscount;

    let product1Num;
    let product2Num;
    let product3Num;
    let product4Num;

    let discount1Num;
    let discount2Num;
    let discount3Num;

    let fixedPriceNum;
    let numProductsNum;
    let unitPriceNum;

    let sortedNumbers: number[];

    switch (type) {
      case DiscountType.PercentageOff:
        priceNum = Number(price) || 0;

        if (priceNum <= 0) {
          reset();
          return;
        }

        discountNum = Number(discount) || 0;

        if (discountNum < 0) {
          reset();
          return;
        }

        payNum = priceNum;
        payNum += (payNum * taxNum) / 100;

        payBeforeDiscount = payNum;
        payNum -= (payNum * discountNum) / 100;
        break;
      case DiscountType.PercentageOff2ndProduct:
        product1Num = Number(product1) || 0;

        if (product1Num <= 0) {
          reset();
          return;
        }

        product2Num = Number(product2) || 0;

        if (product2Num <= 0) {
          reset();
          return;
        }

        discountNum = Number(discount) || 0;

        if (discountNum < 0) {
          reset();
          return;
        }

        payNum = product1Num + product2Num;
        payBeforeDiscount = payNum;

        if (discountNum > 0) {
          sortedNumbers = [product1Num, product2Num].sort();

          payNum =
            sortedNumbers[1] + (sortedNumbers[0] * (100 - discountNum)) / 100;
        }

        if (taxNum > 0) {
          payNum += (payNum * taxNum) / 100;
          payBeforeDiscount += (payBeforeDiscount * taxNum) / 100;
        }
        break;
      case DiscountType.PercentageOff3rdProduct:
        product1Num = Number(product1) || 0;

        if (product1Num <= 0) {
          reset();
          return;
        }

        product2Num = Number(product2) || 0;

        if (product2Num <= 0) {
          reset();
          return;
        }

        product3Num = Number(product3) || 0;

        if (product3Num <= 0) {
          reset();
          return;
        }

        discountNum = Number(discount) || 0;

        if (discountNum < 0) {
          reset();
          return;
        }

        payNum = product1Num + product2Num + product3Num;
        payBeforeDiscount = payNum;

        if (discountNum > 0) {
          sortedNumbers = [product1Num, product2Num, product3Num].sort();

          payNum =
            sortedNumbers[1] +
            sortedNumbers[2] +
            (sortedNumbers[0] * (100 - discountNum)) / 100;
        }

        if (taxNum > 0) {
          payNum += (payNum * taxNum) / 100;
          payBeforeDiscount += (payBeforeDiscount * taxNum) / 100;
        }
        break;
      case DiscountType.FixedAmountOff:
        priceNum = Number(price) || 0;

        if (priceNum <= 0) {
          reset();
          return;
        }

        discountNum = Number(discount) || 0;

        if (discountNum < 0) {
          reset();
          return;
        }

        payNum = priceNum;
        payBeforeDiscount = payNum;

        if (discountNum > 0) {
          payNum -= discountNum;
        }

        if (taxNum > 0) {
          payNum += (payNum * taxNum) / 100;
        }
        break;
      case DiscountType.TwoForOne:
        product1Num = Number(product1) || 0;

        if (product1Num <= 0) {
          reset();
          return;
        }

        product2Num = Number(product2) || 0;

        if (product2Num <= 0) {
          reset();
          return;
        }

        payNum = product1Num + product2Num;
        payBeforeDiscount = payNum;

        sortedNumbers = [product1Num, product2Num].sort();
        payNum = sortedNumbers[1];

        if (taxNum > 0) {
          payNum += (payNum * taxNum) / 100;
          payBeforeDiscount += (payBeforeDiscount * taxNum) / 100;
        }
        break;
      case DiscountType.ThreeForTwo:
        product1Num = Number(product1) || 0;

        if (product1Num <= 0) {
          reset();
          return;
        }

        product2Num = Number(product2) || 0;

        if (product2Num <= 0) {
          reset();
          return;
        }

        product3Num = Number(product3) || 0;

        if (product3Num <= 0) {
          reset();
          return;
        }

        payNum = product1Num + product2Num + product3Num;
        payBeforeDiscount = payNum;

        sortedNumbers = [product1Num, product2Num, product3Num].sort();
        payNum = sortedNumbers[1] + sortedNumbers[2];

        if (taxNum > 0) {
          payNum += (payNum * taxNum) / 100;
          payBeforeDiscount += (payBeforeDiscount * taxNum) / 100;
        }
        break;
      case DiscountType.FourForThree:
        product1Num = Number(product1) || 0;

        if (product1Num <= 0) {
          reset();
          return;
        }

        product2Num = Number(product2) || 0;

        if (product2Num <= 0) {
          reset();
          return;
        }

        product3Num = Number(product3) || 0;

        if (product3Num <= 0) {
          reset();
          return;
        }

        product4Num = Number(product4) || 0;

        if (product4Num <= 0) {
          reset();
          return;
        }

        payNum = product1Num + product2Num + product3Num + product4Num;
        payBeforeDiscount = payNum;

        sortedNumbers = [
          product1Num,
          product2Num,
          product3Num,
          product4Num,
        ].sort();
        payNum = sortedNumbers[1] + sortedNumbers[2] + sortedNumbers[3];

        if (taxNum > 0) {
          payNum += (payNum * taxNum) / 100;
          payBeforeDiscount += (payBeforeDiscount * taxNum) / 100;
        }
        break;
      case DiscountType.DoubleDiscount:
        priceNum = Number(price) || 0;

        if (priceNum <= 0) {
          reset();
          return;
        }

        discount1Num = Number(discount1) || 0;

        if (discount1Num < 0) {
          reset();
          return;
        }

        discount2Num = Number(discount2) || 0;

        if (discount2Num < 0) {
          reset();
          return;
        }

        payNum = priceNum;
        payBeforeDiscount = payNum;

        if (taxNum > 0) {
          payNum += (payNum * taxNum) / 100;
        }

        if (discount1Num > 0) {
          payNum -= (payNum * discount1Num) / 100;
        }

        if (discount2Num > 0) {
          payNum -= (payNum * discount2Num) / 100;
        }
        break;
      case DiscountType.TripleDiscount:
        priceNum = Number(price) || 0;

        if (priceNum <= 0) {
          reset();
          return;
        }

        discount1Num = Number(discount1) || 0;

        if (discount1Num < 0) {
          reset();
          return;
        }

        discount2Num = Number(discount2) || 0;

        if (discount2Num < 0) {
          reset();
          return;
        }

        discount3Num = Number(discount3) || 0;

        if (discount3Num < 0) {
          reset();
          return;
        }

        payNum = priceNum;
        payBeforeDiscount = payNum;

        if (taxNum > 0) {
          payNum += (payNum * taxNum) / 100;
        }

        if (discount1Num > 0) {
          payNum -= (payNum * discount1Num) / 100;
        }

        if (discount2Num > 0) {
          payNum -= (payNum * discount2Num) / 100;
        }

        if (discount3Num > 0) {
          payNum -= (payNum * discount3Num) / 100;
        }
        break;
      case DiscountType.MultipleDiscount:
        numProductsNum = Number(numProducts) || 0;

        if (numProductsNum <= 0) {
          reset();
          return;
        }

        unitPriceNum = Number(unitPrice) || 0;

        if (unitPriceNum <= 0) {
          reset();
          return;
        }

        fixedPriceNum = Number(fixedPrice) || 0;

        if (fixedPriceNum <= 0) {
          reset();
          return;
        }

        payBeforeDiscount = numProductsNum * unitPriceNum;
        payNum = fixedPriceNum;

        if (taxNum > 0) {
          payBeforeDiscount += (payBeforeDiscount * taxNum) / 100;
          payNum += (payNum * taxNum) / 100;
        }
        break;
      default:
        return;
    }

    if (payNum < 0) {
      reset();
    } else {
      setPay(payNum.toFixed(2));
      setSave((payBeforeDiscount - payNum).toFixed(2));
    }
  };

  useEffect(() => {
    calculateTotals();
  }, [price, discount, discount1, discount2, discount3, fixedPrice, numProducts, product1, product2, product3, product4, tax, type, unitPrice]);

  useEffect(() => {
    setTimeout(() => {
      let y = 0;

      switch (activeRow) {
        case 1:
          y = layout1.y;
          break;
        case 2:
          y = layout2.y;
          break;
        case 3:
          y = layout3.y;
          break;
        case 4:
          y = layout4.y;
          break;
        case 5:
          y = layout5.y;
          break;
        case 6:
          y = layout6.y;
          break;
        case 7:
          y = layout7.y;
          break;
        case 8:
          y = layout8.y;
          break;
        case 8:
          y = layout8.y;
          break;
        case 9:
          y = layout9.y;
          break;
        case 10:
          y = layout10.y;
          break;
        case 11:
          y = layout11.y;
          break;
        case 12:
          y = layout12.y;
          break;
        case 13:
          y = layout13.y;
          break;
        case 14:
          y = layout14.y;
          break;
        default:
      }

      calculateTotals();

      scrollRef?.current?.scrollTo({x: 0, y, animated: true});
    }, 0);
  }, [activeRow]);

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {
          backgroundColor2,
          backgroundColor3,
          borderColor,
          color,
          color2,
          color4,
          iconColor,
          modal,
          primary,
        } = theme;

        const activeView = (row: number) => [
          styles.switchView,
          {
            backgroundColor:
              activeRow === row ? backgroundColor2 : backgroundColor3,
            borderColor,
            borderWidth: activeRow === row ? 1 : 0,
            marginHorizontal: wp(2),
          },
        ];

        const resultView = [
          styles.switchView,
          {
            backgroundColor: backgroundColor3,
            marginHorizontal: wp(2),
          },
        ];

        const discountTextColor = negativeDiscount ? 'red' : color2;
        const priceTextColor = negativePrice ? 'red' : color2;
        const taxTextColor = negativeTax ? 'red' : color2;

        const payTextColor = negativePay ? 'red' : color4;
        const saveTextColor = negativeSave ? 'red' : color4;

        const product1TextColor = negativeProduct1 ? 'red' : color2;
        const product2TextColor = negativeProduct2 ? 'red' : color2;
        const product3TextColor = negativeProduct3 ? 'red' : color2;
        const product4TextColor = negativeProduct4 ? 'red' : color2;

        const discount1TextColor = negativeDiscount1 ? 'red' : color2;
        const discount2TextColor = negativeDiscount2 ? 'red' : color2;
        const discount3TextColor = negativeDiscount3 ? 'red' : color2;

        const fixedPriceTextColor = negativeFixedPrice ? 'red' : color2;
        const numProductsTextColor = negativeNumProducts ? 'red' : color2;
        const unitPriceTextColor = negativeUnitPrice ? 'red' : color2;

        return (
          <>
            <ScrollView
              ref={scrollRef}
              style={{backgroundColor: backgroundColor3}}>
              <Pressable
                onLayout={event => setLayout1(event.nativeEvent.layout)}
                onPress={() => {
                  anal(`discount_line1`);

                  setPrevActiveRow(activeRow);
                  setActiveRow(1);

                  setModalTypeVisible(true);
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? modal : backgroundColor3,
                  },
                ]}
                testID="line1">
                {() => (
                  <View style={activeView(1)}>
                    <View style={[styles.switchLeft, {flex: 2}]}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View style={styles.rowLeft}>
                          <MDIcon
                            name="shape"
                            size={wp(6)}
                            style={{color: iconColor}}
                          />
                        </View>
                        <View style={styles.rowRight}>
                          <Text
                            style={[
                              styles.text,
                              {color, fontFamily: fontFamilyBold},
                            ]}>
                            {i18n.t('discount.line1')}
                          </Text>
                          {(type === DiscountType.PercentageOff2ndProduct ||
                            type === DiscountType.PercentageOff3rdProduct) && (
                            <Text
                              style={[
                                styles.caption,
                                {
                                  color: color2,
                                  fontFamily,
                                  paddingTop: wp(1),
                                },
                              ]}>
                              {i18n.t('discount.line19')}
                            </Text>
                          )}
                          {(type === DiscountType.TwoForOne ||
                            type === DiscountType.ThreeForTwo ||
                            type === DiscountType.FourForThree) && (
                            <Text
                              style={[
                                styles.caption,
                                {
                                  color: color2,
                                  fontFamily,
                                  paddingTop: wp(1),
                                },
                              ]}>
                              {i18n.t('discount.line20')}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <View style={styles.switchRight}>
                      <Text
                        style={[
                          styles.text,
                          {color: color2, fontFamily: fontFamilyBold},
                        ]}>
                        {discountTypeValue}
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>
              {(type === DiscountType.PercentageOff ||
                type === DiscountType.FixedAmountOff ||
                type === DiscountType.DoubleDiscount ||
                type === DiscountType.TripleDiscount) && (
                <Pressable
                  onLayout={event => setLayout2(event.nativeEvent.layout)}
                  onPress={() => {
                    anal(`discount_line2`);
                    setPrevActiveRow(activeRow);
                    setActiveRow(2);
                  }}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? modal : backgroundColor3,
                    },
                  ]}
                  testID="line2">
                  {() => (
                    <View style={activeView(2)}>
                      <View style={styles.switchLeft}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <View style={styles.rowLeft}>
                            <MDIcon
                              name="cash"
                              size={wp(6)}
                              style={{color: iconColor}}
                            />
                          </View>
                          <View style={styles.rowRight}>
                            <Text
                              style={[
                                styles.text,
                                {color, fontFamily: fontFamilyBold},
                              ]}>
                              {i18n.t('discount.line2')}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.switchRight}>
                        <Text
                          style={[
                            styles.text,
                            {color: priceTextColor, fontFamily: fontFamilyBold},
                          ]}>
                          {formattedPrice}
                        </Text>
                      </View>
                    </View>
                  )}
                </Pressable>
              )}
              {type !== DiscountType.TwoForOne &&
                type !== DiscountType.ThreeForTwo &&
                type !== DiscountType.FourForThree &&
                type !== DiscountType.DoubleDiscount &&
                type !== DiscountType.TripleDiscount &&
                type !== DiscountType.MultipleDiscount && (
                  <Pressable
                    onLayout={event => setLayout3(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line3`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(3);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line3">
                    {() => (
                      <View style={activeView(3)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="content-cut"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line3')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: discountTextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedDiscount}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                )}
              {(type === DiscountType.PercentageOff2ndProduct ||
                type === DiscountType.PercentageOff3rdProduct ||
                type === DiscountType.TwoForOne ||
                type === DiscountType.ThreeForTwo ||
                type === DiscountType.FourForThree) && (
                <>
                  <Pressable
                    onLayout={event => setLayout5(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line5`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(5);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(5)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="numeric-1-box"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line8')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: product1TextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedProduct1}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                  <Pressable
                    onLayout={event => setLayout6(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line6`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(6);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(6)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="numeric-2-box"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line9')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: product2TextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedProduct2}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                </>
              )}
              {(type === DiscountType.PercentageOff3rdProduct ||
                type === DiscountType.ThreeForTwo ||
                type === DiscountType.FourForThree) && (
                <>
                  <Pressable
                    onLayout={event => setLayout7(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line7`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(7);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(7)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="numeric-3-box"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line10')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: product3TextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedProduct3}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                </>
              )}
              {type === DiscountType.FourForThree && (
                <>
                  <Pressable
                    onLayout={event => setLayout8(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line8`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(8);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(8)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="numeric-4-box"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line11')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: product4TextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedProduct4}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                </>
              )}
              {(type === DiscountType.DoubleDiscount ||
                type === DiscountType.TripleDiscount) && (
                <>
                  <Pressable
                    onLayout={event => setLayout9(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line9`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(9);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(9)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="numeric-1-box"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line13')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: discount1TextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedDiscount1}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                  <Pressable
                    onLayout={event => setLayout10(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line10`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(10);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(10)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="numeric-2-box"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line14')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: discount2TextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedDiscount2}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                </>
              )}
              {type === DiscountType.TripleDiscount && (
                <>
                  <Pressable
                    onLayout={event => setLayout11(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line11`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(11);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(11)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="numeric-3-box"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line15')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: discount3TextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedDiscount3}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                </>
              )}
              {type === DiscountType.MultipleDiscount && (
                <>
                  <Pressable
                    onLayout={event => setLayout12(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line12`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(12);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(12)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="numeric"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line16')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: numProductsTextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedNumProducts}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                  <Pressable
                    onLayout={event => setLayout13(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line13`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(13);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(13)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="unity"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line17')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: unitPriceTextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedUnitPrice}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                  <Pressable
                    onLayout={event => setLayout14(event.nativeEvent.layout)}
                    onPress={() => {
                      anal(`discount_line14`);
                      setPrevActiveRow(activeRow);
                      setActiveRow(14);
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="line8">
                    {() => (
                      <View style={activeView(14)}>
                        <View style={styles.switchLeft}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={styles.rowLeft}>
                              <MDIcon
                                name="crosshairs-gps"
                                size={wp(6)}
                                style={{color: iconColor}}
                              />
                            </View>
                            <View style={styles.rowRight}>
                              <Text
                                style={[
                                  styles.text,
                                  {color, fontFamily: fontFamilyBold},
                                ]}>
                                {i18n.t('discount.line18')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.switchRight}>
                          <Text
                            style={[
                              styles.text,
                              {
                                color: fixedPriceTextColor,
                                fontFamily: fontFamilyBold,
                              },
                            ]}>
                            {formattedFixedPrice}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                </>
              )}
              <Pressable
                onLayout={event => setLayout4(event.nativeEvent.layout)}
                onPress={() => {
                  anal(`discount_line4`);
                  setPrevActiveRow(activeRow);
                  setActiveRow(4);
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? modal : backgroundColor3,
                  },
                ]}
                testID="line4">
                {() => (
                  <View style={activeView(4)}>
                    <View style={styles.switchLeft}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View style={styles.rowLeft}>
                          <MDIcon
                            name="cash-refund"
                            size={wp(6)}
                            style={{color: iconColor}}
                          />
                        </View>
                        <View style={styles.rowRight}>
                          <Text
                            style={[
                              styles.text,
                              {color, fontFamily: fontFamilyBold},
                            ]}>
                            {i18n.t('discount.line4')}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.switchRight}>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: taxTextColor,
                            fontFamily: fontFamilyBold,
                          },
                        ]}>
                        {formattedTax}
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>
              <Text
                style={[
                  styles.heading,
                  {
                    backgroundColor: backgroundColor3,
                    color: color2,
                    fontFamily: fontFamilyBold,
                  },
                ]}>
                {i18n.t('discount.line5')}
              </Text>
              <View style={resultView}>
                <View style={styles.switchLeft}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="credit-card-outline"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Text
                        style={[
                          styles.text,
                          {color, fontFamily: fontFamilyBold},
                        ]}>
                        {i18n.t('discount.line6')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}>
                  <Text
                    style={[
                      styles.textSum,
                      {
                        color: payTextColor,
                        fontFamily: fontFamilyBold,
                      },
                    ]}>
                    {formattedPay}
                  </Text>
                </View>
              </View>
              <View style={resultView}>
                <View style={styles.switchLeft}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="cash-multiple"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Text
                        style={[
                          styles.text,
                          {color, fontFamily: fontFamilyBold},
                        ]}>
                        {i18n.t('discount.line7')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}>
                  <Text
                    style={[
                      styles.textSum,
                      {
                        color: saveTextColor,
                        fontFamily: fontFamilyBold,
                      },
                    ]}>
                    {formattedSave}
                  </Text>
                </View>
              </View>
            </ScrollView>
            <RCModal
              isVisible={modalTypeVisible}
              onBackButtonPress={() => {
                setModalTypeVisible(false);
              }}
              onBackdropPress={() => {
                setModalTypeVisible(false);
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
                  {i18n.t('discount.line1')}
                </Subheading>
                <RadioButton.Group
                  onValueChange={button => {
                    const type = getDiscountTypeKeyFromValue(button);
                    setType(type);
                    setModalTypeVisible(false);
                  }}
                  value={discountTypeValue}>
                  {discountTypeOptions.map((t: string) => (
                    <View key={t} style={styles.modalEntry}>
                      {/* 
                // @ts-ignore */}
                      <RadioButton.Android
                        color={color}
                        status="unchecked"
                        style={{alignContent: 'center'}}
                        value={t}
                      />
                      <Text style={[styles.modalText, {color, fontFamily}]}>
                        {t}
                      </Text>
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
                      setModalTypeVisible(false);
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
