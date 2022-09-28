import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React, {Component} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import RCModal from 'react-native-modal';
import {Button, RadioButton, Subheading, Text} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {Digits} from '../../../components/general/digits';
import {Display} from '../../../components/general/display';
import {fetchCalculators} from '../../../db/db';
import {Calculator as CalculatorModel} from '../../../db/models';
import {screenHeight, screenWidth} from '../../../helpers/constants';
import i18n, {isHindi} from '../../../helpers/i18n';
import {
  abs,
  acos,
  acos2,
  acosh,
  acosh2,
  asin,
  asin2,
  asinh,
  asinh2,
  atan,
  atan2,
  atanh,
  atanh2,
  cbrt,
  cbrt2,
  ceil,
  cos,
  cos2,
  cosh,
  cosh2,
  cubed,
  equals,
  euler,
  exp,
  floor,
  golden,
  golden2,
  inverse,
  isConstantPrefix,
  isDigit,
  isDigitOrSymbol,
  isError,
  isOp,
  ln10,
  ln2,
  log,
  log10,
  log10e,
  log10_f,
  log2,
  log2e,
  log2_f,
  log_f,
  memoryAdd,
  memorySubtract,
  negate,
  percent,
  pie,
  rand,
  round,
  sin,
  sin2,
  sinh,
  sinh2,
  speakInput,
  sqrt,
  sqrt1_2,
  sqrt2,
  sqrt_f,
  square,
  tan,
  tan2,
  tanh,
  tanh2,
  toDegrees,
  toRadians,
  trunc,
} from '../../../helpers/math';
import {
  calcConstOptions,
  calcGeneralOptions,
  calcLogOptions,
  calcPowerOptions,
  calcTrigOptions,
  calculatorGeneralOptions,
  getCalculatorKeyFromValue,
  getTag,
  getTagKeyFromValue,
} from '../../../helpers/pickers';
import {getCalcTheme, ThemeContext} from '../../../helpers/themes';
import {analButton, getFont, setData, toHindi} from '../../../helpers/utils';
import {RootState} from '../../../redux';
import {
  CalculatorState,
  setCalculator,
  setClear,
  setMemory,
  setOutput,
  setRefresh as setCalcRefresh,
  setUpdatePic,
} from '../../../redux/calculator';
import {setFreqList} from '../../../redux/config';
import {
  ImageState,
  setHeight,
  setImage,
  setShowPic,
  setWidth,
} from '../../../redux/image';

type Props = CalculatorState &
  ImageState & {
    calculator: number;
    ctheme: number;
    decSep: string;
    discount: boolean;
    freqList: Record<string, number>;
    freqTotal: number;
    height: number;
    image: string;
    inplace: boolean;
    noAds: boolean;
    radians: boolean;
    showPic: boolean;
    speech: boolean;
    updatePic: boolean;
    vibrate: boolean;
    width: number;
    setCalcRefresh: ActionCreatorWithPayload<unknown, string>;
    setCalculator: ActionCreatorWithPayload<unknown, string>;
    setClear: ActionCreatorWithPayload<unknown, string>;
    setFreqList: ActionCreatorWithPayload<unknown, string>;
    setHeight: ActionCreatorWithPayload<unknown, string>;
    setImage: ActionCreatorWithPayload<unknown, string>;
    setMemory: ActionCreatorWithPayload<unknown, string>;
    setOutput: ActionCreatorWithPayload<unknown, string>;
    setShowPic: ActionCreatorWithPayload<unknown, string>;
    setUpdatePic: ActionCreatorWithPayload<unknown, string>;
    setWidth: ActionCreatorWithPayload<unknown, string>;
  };

type State = {
  equalsPressed: boolean;
  loaded: boolean;
  modalMenuVisible: boolean;
  subtotal: string;
};

const mapStateToProps = (state: RootState) => ({
  ...state.calculator,
  ...state.image,
  ctheme: state.config.theme,
  decSep: state.config.decSep,
  discount: state.purchases.discount,
  freqList: state.config.freqList,
  freqTotal: state.config.freqTotal,
  image: state.image.image,
  inplace: state.config.inplace,
  noAds: state.purchases.noAds,
  radians: state.config.radians,
  showPic: state.image.showPic,
  speech: state.config.speech,
  vibrate: state.config.vibrate,
  width: state.image.width,
});

const mapDispatchToProps = {
  setCalcRefresh,
  setCalculator,
  setClear,
  setFreqList,
  setHeight,
  setImage,
  setMemory,
  setOutput,
  setShowPic,
  setUpdatePic,
  setWidth,
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

export const GeneralCalculator = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  class _ extends Component<Props, State> {
    brackets = 0;

    constructor(props: Props) {
      super(props);

      this.state = {
        equalsPressed: false,
        loaded: false,
        modalMenuVisible: false,
        subtotal: '0',
      };

      _.contextType = ThemeContext;
    }

    async componentDidMount() {
      this.getImage();
    }

    componentDidUpdate(prevProps: Props) {
      const {clear, output, updatePic, setClear, setUpdatePic} = this.props;
      const {loaded} = this.state;

      if (!loaded) {
        this.setState({
          loaded: true,
        });
      }

      if (prevProps.updatePic !== updatePic) {
        if (updatePic) {
          setUpdatePic(false);
          this.getImage();
        }
      }

      if (output) {
        if (prevProps.clear !== clear && clear) {
          setClear(false);
          this.copy();
        }
      }
    }

    addFreq = (button: string) => {
      const {freqList, setFreqList} = this.props;

      const o = {...freqList};
      const key = getTagKeyFromValue(button);

      o[key] ? (o[key] = o[key] + 1) : (o[key] = 1);

      setData('set_freqList', JSON.stringify(o));
      setFreqList(Object.assign({}, o));
    };

    async getImage() {
      const {setHeight, setImage, setWidth} = this.props;

      const sql = `SELECT * FROM calculators`;
      const fetched = (await fetchCalculators(sql)) as Array<CalculatorModel>;

      if (fetched && fetched.length) {
        const {height, image, width} = fetched[0];

        setHeight(height);
        setWidth(width);
        setImage(image);
      }
    }

    backspace = () => {
      const {output} = this.props;

      if (!output) {
        return;
      }

      const lastChar = output.slice(-1);

      switch (lastChar) {
        case '(':
          this.brackets--;
          break;

        case ')':
          this.brackets++;
          break;

        default:
      }

      const l = output.length;

      if (l === 1) {
        this.clear();
      }

      return l > 1 ? output.slice(0, l - 1) : '0';
    };

    bracket = () => {
      const {decSep, output} = this.props;

      if (!output) {
        return;
      }

      if (output === '0') {
        this.brackets++;
        return '(';
      }

      const lastChar = output.slice(-1);

      if (
        (isDigit(lastChar) || isConstantPrefix(output)) &&
        this.brackets === 0
      ) {
        this.brackets++;
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
          this.brackets++;
          return `${output}(`;

        case decSep:
          return output;

        default:
      }

      if (this.brackets > 0) {
        this.brackets--;
        return `${output})`;
      }

      return output;
    };

    clear = () => {
      const {setOutput} = this.props;

      this.brackets = 0;
      setOutput('0');

      this.setState({
        equalsPressed: false,
        modalMenuVisible: false,
        subtotal: '0',
      });
    };

    copy = () => {
      this.brackets = 0;

      this.setState({
        equalsPressed: false,
        modalMenuVisible: false,
        subtotal: '0',
      });
    };

    onLongPress = (key: string | undefined) => {
      const {speech} = this.props;

      switch (key) {
        case 'backspace-outline':
          speakInput(i18n.t('calc.op_clear'), speech);
          this.clear();
          break;
        default:
      }
    };

    onMenuPress = () => {
      this.setState({modalMenuVisible: true});
    };

    onPress = (key: string | undefined) => {
      const {
        decSep,
        inplace,
        memory,
        output,
        radians,
        setCalcRefresh,
        setMemory,
        setOutput,
        speech,
        vibrate,
      } = this.props;

      analButton(key, decSep);

      const setResult = (result = '') => {
        if (!result) {
          return;
        }

        setOutput(result);

        if (!isError(result)) {
          setData('calc_output', result);
        }

        if (this.brackets === 0) {
          const tmp = equals(result, {
            radians,
          });
          this.setState(state => ({
            subtotal:
              tmp !== i18n.t('calc.error') && !tmp.includes('function')
                ? tmp
                : state.subtotal,
          }));
        }
      };

      const simpleOp = (symbol: string) => {
        setResult(isOpLastChar ? output : `${output}${symbol}`);
      };

      this.setState({
        equalsPressed: false,
      });

      if (isError(output)) {
        this.clear();
        return;
      }

      if (vibrate) {
        Vibration.vibrate(32);
      }

      const l = output.length;
      const lastChar = output.slice(-1);

      if (isDigit(key)) {
        key && speakInput(key, speech);
        setResult(output === '0' ? key : `${output}${key}`);
        return;
      }

      const isOpLastChar = isOp(lastChar);

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
            setResult(output2);

            this.setState({
              subtotal: output2 || '',
            });
          }
          break;

        case '( )':
          speakInput(i18n.t('calc.op_brackets'), speech);
          setResult(this.bracket());
          break;

        case '=':
          if (!output || (l < 3 && !isConstantPrefix(output))) {
            return;
          }

          if (
            this.brackets === 0 &&
            (isDigitOrSymbol(lastChar, ')') || isConstantPrefix(output))
          ) {
            const output2 = equals(output, {
              callback: () => setCalcRefresh(true),
              log: true,
              radians,
            });

            setResult(output2);
            this.brackets = 0;

            this.setState({
              equalsPressed: true,
            });

            speakInput(
              `${key} ${isHindi() ? toHindi(output2) : output2}`,
              speech,
            );
          }
          break;

        case decSep:
          if (!isOpLastChar) {
            speakInput(i18n.t('calc.op_point'), speech);
            setResult(`${output}.`);
          }
          break;

        case '←':
        case 'backspace-outline':
          speakInput(i18n.t('calc.op_back'), speech);
          setResult(this.backspace());
          break;

        case 'mc':
          speakInput(i18n.t('calc.op_mem_clear'), speech);
          setMemory('0');
          break;

        case 'm+':
          if (
            this.brackets === 0 &&
            (isDigitOrSymbol(lastChar, ')') || isConstantPrefix(output))
          ) {
            speakInput(i18n.t('calc.op_mem_add'), speech);

            const result = memoryAdd(memory, output, {
              callback: () => setCalcRefresh(true),
              radians,
            });

            if (!isError(result)) {
              setMemory(result);
            }
          }
          break;

        case 'm-':
          if (
            this.brackets === 0 &&
            (isDigitOrSymbol(lastChar, ')') || isConstantPrefix(output))
          ) {
            speakInput(i18n.t('calc.op_mem_subtract'), speech);

            const result = memorySubtract(memory, output, {
              callback: () => setCalcRefresh(true),
              radians,
            });

            if (!isError(result)) {
              setMemory(result);
            }
          }
          break;

        case 'mr':
          speakInput(i18n.t('calc.op_mem_recall'), speech);
          setResult(output === '0' ? memory : `${output}${memory}`);
          break;

        case i18n.t('calc.abs'):
          speakInput(i18n.t('calc.op_absolute'), speech);
          setResult(abs(output));
          break;

        case i18n.t('calc.ceil'):
          speakInput(i18n.t('calc.op_ceiling'), speech);
          setResult(ceil(output));
          break;

        case 'cos':
        case i18n.t('calc.cos'):
          speakInput(i18n.t('calc.cos'), speech);

          if (inplace) {
            setResult(cos2(radians ? output : toRadians(output)));
          } else {
            this.brackets++;
            setResult(cos(output));
          }
          break;

        case i18n.t('calc.cos2'):
          speakInput(i18n.t('calc.cos2'), speech);

          if (inplace) {
            const res = acos2(output);
            setResult(radians ? res : toDegrees(res));
          } else {
            this.brackets++;
            setResult(acos(output));
          }
          break;

        case i18n.t('calc.cos3'):
          speakInput(i18n.t('calc.cos3'), speech);

          if (inplace) {
            setResult(acosh2(output));
          } else {
            this.brackets++;
            setResult(acosh(output));
          }
          break;

        case i18n.t('calc.cos4'):
          speakInput(i18n.t('calc.cos4'), speech);

          if (inplace) {
            setResult(cosh2(output));
          } else {
            this.brackets++;
            setResult(cosh(output));
          }
          break;

        case '𝑥³':
        case i18n.t('calc.cubed'):
          speakInput(i18n.t('calc.op_cube'), speech);
          setResult(cubed(output));
          break;

        case '3√𝑥':
        case i18n.t('calc.cube_root'):
          speakInput(i18n.t('calc.op_cbrt'), speech);

          if (inplace) {
            setResult(cbrt2(output));
          } else {
            this.brackets++;
            setResult(cbrt(output));
          }
          break;

        case '𝑒':
        case i18n.t('calc.e'):
          speakInput(i18n.t('calc.op_e'), speech);
          setResult(euler(output));
          break;

        case '𝑒^𝑥':
        case i18n.t('calc.exp'):
          speakInput(i18n.t('calc.op_exp'), speech);
          setResult(exp(output));
          break;

        case i18n.t('calc.floor'):
          speakInput(i18n.t('calc.op_floor'), speech);
          setResult(floor(output));
          break;

        case 'ϕ':
        case i18n.t('calc.golden'):
          speakInput(i18n.t('calc.op_gold'), speech);
          setResult(golden(output));
          break;

        case i18n.t('calc.golden2'):
          speakInput(i18n.t('calc.op_gold2'), speech);
          speakInput('silver ratio', speech);
          setResult(golden2(output));
          break;

        case '1/𝑥':
        case i18n.t('calc.inv'):
          speakInput(i18n.t('calc.inv'), speech);
          setResult(inverse(output));
          break;

        case i18n.t('calc.ln2'):
          speakInput(i18n.t('calc.op_ln2'), speech);
          setResult(ln2(output));
          break;

        case i18n.t('calc.ln10'):
          speakInput(i18n.t('calc.op_ln10'), speech);
          setResult(ln10(output));
          break;

        case 'ln':
        case i18n.t('calc.ln'):
          speakInput(i18n.t('calc.op_ln'), speech);

          if (inplace) {
            setResult(log_f(output));
          } else {
            this.brackets++;
            setResult(log(output));
          }
          break;

        case i18n.t('calc.log2e'):
          speakInput(i18n.t('calc.op_log2e'), speech);
          setResult(log2e(output));
          break;

        case i18n.t('calc.log10e'):
          speakInput(i18n.t('calc.op_log10e'), speech);
          setResult(log10e(output));
          break;

        case 'lg2':
        case i18n.t('calc.log2'):
          speakInput(i18n.t('calc.op_log2'), speech);

          if (inplace) {
            setResult(log2_f(output));
          } else {
            this.brackets++;
            setResult(log2(output));
          }
          break;

        case 'log':
        case i18n.t('calc.log'):
          speakInput(i18n.t('calc.op_log10'), speech);

          if (inplace) {
            setResult(log10_f(output));
          } else {
            this.brackets++;
            setResult(log10(output));
          }
          break;

        case i18n.t('calc.mod'):
          speakInput(i18n.t('calc.op_mod'), speech);
          simpleOp('%');
          break;

        case '±':
        case i18n.t('calc.neg'):
          speakInput(i18n.t('calc.neg'), speech);
          setResult(negate(output) || output);
          break;

        case 'π':
        case i18n.t('calc.pi'):
          speakInput('pie', speech);
          setResult(pie(output));
          break;

        case '𝑥^y':
        case i18n.t('calc.power'):
          speakInput(i18n.t('calc.op_power'), speech);
          simpleOp('^');
          break;

        case 'rnd':
        case i18n.t('calc.rand'):
          speakInput(i18n.t('calc.op_rand'), speech);
          setResult(rand(output));
          break;

        case i18n.t('calc.round'):
          speakInput(i18n.t('calc.op_rounded'), speech);
          setResult(round(output));
          break;

        case 'sin':
        case i18n.t('calc.sin'):
          speakInput(i18n.t('calc.sin'), speech);

          if (inplace) {
            setResult(sin2(radians ? output : toRadians(output)));
          } else {
            this.brackets++;
            setResult(sin(output));
          }
          break;

        case i18n.t('calc.sin2'):
          speakInput(i18n.t('calc.sin2'), speech);

          if (inplace) {
            const res = asin2(output);
            setResult(radians ? res : toDegrees(res));
          } else {
            this.brackets++;
            setResult(asin(output));
          }
          break;

        case i18n.t('calc.sin3'):
          speakInput(i18n.t('calc.sin3'), speech);

          if (inplace) {
            setResult(asinh2(output));
          } else {
            this.brackets++;
            setResult(asinh(output));
          }
          break;

        case i18n.t('calc.sin4'):
          speakInput(i18n.t('calc.sin4'), speech);

          if (inplace) {
            setResult(sinh2(output));
          } else {
            this.brackets++;
            setResult(sinh(output));
          }
          break;

        case '𝑥²':
        case i18n.t('calc.square'):
          speakInput(i18n.t('calc.op_square'), speech);
          setResult(square(output));
          break;

        case '√𝑥':
        case i18n.t('calc.square_root'):
          speakInput(i18n.t('calc.op_sqrt'), speech);

          if (inplace) {
            setResult(sqrt_f(output));
          } else {
            this.brackets++;
            setResult(sqrt(output));
          }
          break;

        case '√½':
        case i18n.t('calc.sqrt1_2'):
          speakInput(i18n.t('calc.op_sqrt1_2'), speech);
          setResult(sqrt1_2(output));
          break;

        case '√2':
        case i18n.t('calc.sqrt2'):
          speakInput(i18n.t('calc.op_sqrt2'), speech);
          setResult(sqrt2(output));
          break;

        case 'tan':
        case i18n.t('calc.tan'):
          speakInput(i18n.t('calc.tan'), speech);

          if (inplace) {
            setResult(tan2(radians ? output : toRadians(output)));
          } else {
            this.brackets++;
            setResult(tan(output));
          }
          break;

        case i18n.t('calc.tan2'):
          speakInput(i18n.t('calc.tan2'), speech);

          if (inplace) {
            const res = atan2(output);
            setResult(radians ? res : toDegrees(res));
          } else {
            this.brackets++;
            setResult(atan(output));
          }
          break;

        case i18n.t('calc.tan3'):
          speakInput(i18n.t('calc.tan3'), speech);

          if (inplace) {
            setResult(atanh2(output));
          } else {
            this.brackets++;
            setResult(atanh(output));
          }
          break;

        case i18n.t('calc.tan4'):
          speakInput(i18n.t('calc.tan4'), speech);

          if (inplace) {
            setResult(tanh2(output));
          } else {
            this.brackets++;
            setResult(tanh(output));
          }
          break;

        case i18n.t('calc.trunc'):
          speakInput(i18n.t('calc.op_trunc'), speech);
          setResult(trunc(output));
          break;

        default:
      }
    };

    render() {
      const {
        ctheme,
        discount,
        freqList,
        freqTotal,
        image,
        memory,
        noAds,
        output,
        showPic,
        width,
        setCalculator,
        setShowPic,
      } = this.props;

      const {equalsPressed, modalMenuVisible, subtotal} = this.state;

      const {theme} = this.context;
      const {color, modal, primary} = theme;

      const {backgroundColor} = getCalcTheme(ctheme);

      const imagePresent = image !== '';
      const imageOnly = imagePresent && showPic;

      const content = (
        <ScrollView>
          <Display
            equalsPressed={equalsPressed}
            imageOnly={imageOnly}
            imagePresent={imagePresent}
            memory={memory}
            onImagePress={() => {
              setShowPic(!showPic);
            }}
            output={output}
            subtotal={subtotal}
            theme={ctheme}
          />
          <View style={{paddingVertical: hp(noAds ? 0.8 : 0.6)}} />
          <Digits
            imageOnly={imageOnly}
            onLongPress={this.onLongPress}
            onMenuPress={this.onMenuPress}
            onPress={this.onPress}
            theme={ctheme}
          />
        </ScrollView>
      );

      const freqSortedList = Object.entries(freqList)
        .filter(a => a[1] > 4)
        .sort((a, b) => b[1] - a[1])
        .map(e => getTag(e[0]))
        .slice(0, freqTotal)
        .sort();

      const fontFamily = getFont();
      const fontFamilyBold = getFont(true);

      const calculatorOptions = calculatorGeneralOptions({discount});

      return (
        <>
          {imagePresent && (
            <ImageBackground
              source={{
                uri: image,
              }}
              style={{
                height: (screenWidth / width) * screenHeight,
                width: screenWidth,
              }}
              testID="photo">
              {content}
            </ImageBackground>
          )}
          {!imagePresent && (
            <View style={{backgroundColor, flex: 1}}>{content}</View>
          )}
          <RCModal
            isVisible={modalMenuVisible}
            onBackButtonPress={() => {
              this.setState({modalMenuVisible: false});
            }}
            onBackdropPress={() => {
              this.setState({modalMenuVisible: false});
            }}>
            <ScrollView
              contentContainerStyle={[
                styles.modalContainer,
                {backgroundColor: modal},
              ]}>
              {calculatorOptions.length > 0 && (
                <>
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
                      this.setState({modalMenuVisible: false});
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
                        <Text style={[styles.modalText, {fontFamily}]}>
                          {t}
                        </Text>
                      </View>
                    ))}
                  </RadioButton.Group>
                  <View style={{marginVertical: wp(2)}} />
                </>
              )}
              {freqSortedList.length > 0 && (
                <>
                  <Subheading
                    style={[
                      styles.modalSubheading,
                      {color: primary, fontFamily: fontFamilyBold},
                    ]}>
                    {i18n.t('calc.adv6')}
                  </Subheading>
                  <RadioButton.Group
                    onValueChange={button => {
                      this.addFreq(button);
                      this.onPress(button);
                      this.setState({modalMenuVisible: false});
                    }}
                    value="">
                    {freqSortedList.map((t: string) => (
                      <View key={t} style={styles.modalEntry}>
                        {/* 
            // @ts-ignore */}
                        <RadioButton.Android
                          color={color}
                          status="unchecked"
                          style={{alignContent: 'center'}}
                          value={t}
                        />
                        <Text style={[styles.modalText, {fontFamily}]}>
                          {t}
                        </Text>
                      </View>
                    ))}
                  </RadioButton.Group>
                  <View style={{marginVertical: wp(2)}} />
                </>
              )}
              <Subheading
                style={[
                  styles.modalSubheading,
                  {color: primary, fontFamily: fontFamilyBold},
                ]}>
                {i18n.t('calc.adv')}
              </Subheading>
              <RadioButton.Group
                onValueChange={button => {
                  this.addFreq(button);
                  this.onPress(button);
                  this.setState({modalMenuVisible: false});
                }}
                value="">
                {calcGeneralOptions.map((t: string) => (
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
                {i18n.t('calc.adv5')}
              </Subheading>
              <RadioButton.Group
                onValueChange={button => {
                  this.addFreq(button);
                  this.onPress(button);
                  this.setState({modalMenuVisible: false});
                }}
                value="">
                {calcLogOptions.map((t: string) => (
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
                {i18n.t('calc.adv4')}
              </Subheading>
              <RadioButton.Group
                onValueChange={button => {
                  this.addFreq(button);
                  this.onPress(button);
                  this.setState({modalMenuVisible: false});
                }}
                value="">
                {calcPowerOptions.map((t: string) => (
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
                {i18n.t('calc.adv3')}
              </Subheading>
              <RadioButton.Group
                onValueChange={button => {
                  this.addFreq(button);
                  this.onPress(button);
                  this.setState({modalMenuVisible: false});
                }}
                value="">
                {calcTrigOptions.map((t: string) => (
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
                {i18n.t('calc.adv2')}
              </Subheading>
              <RadioButton.Group
                onValueChange={button => {
                  this.addFreq(button);
                  this.onPress(button);
                  this.setState({modalMenuVisible: false});
                }}
                value="">
                {calcConstOptions.map((t: string) => (
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
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                {/* 
            // @ts-ignore */}
                <Button
                  compact={true}
                  onPress={() => {
                    this.setState({modalMenuVisible: false});
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
    }
  },
);
