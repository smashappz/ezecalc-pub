import React, {useEffect, useRef} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {HEIGHT_RATIO} from '../../../helpers/constants';
import {getCalcTheme} from '../../../helpers/themes';
import {anal, formatOutput, getFont} from '../../../helpers/utils';
import {RootState} from '../../../redux';

type Props = {
  decSep: string;
  equalsPressed?: boolean;
  imageOnly?: boolean;
  imagePresent?: boolean;
  memory: string;
  negRed: boolean;
  noAds: boolean;
  onImagePress: () => void;
  output: string;
  palette: boolean;
  showSubtotal: boolean;
  subtotal: string;
  theme: number;
  thouSep: string;
};

const styles = StyleSheet.create({
  displayDigits: {
    paddingHorizontal: wp(4),
  },
  displayLastMemory: {
    fontSize: wp(4),
    paddingLeft: wp(3),
  },
  displayResult: {alignItems: 'flex-end', width: '100%'},
  displaySub: {flexDirection: 'row'},
  displayTop: {flexDirection: 'row', paddingTop: hp(0.25)},
  displayTopLastOps: {alignItems: 'flex-end', flex: 1},
  displayTopMemory: {alignItems: 'flex-start', flex: 1},
});

const mapStateToProps = (state: RootState) => ({
  decSep: state.config.decSep,
  negRed: state.config.negRed,
  noAds: state.purchases.noAds,
  palette: state.config.palette,
  showSubtotal: state.config.subtotal,
  thouSep: state.config.thouSep,
});

export const Display = connect(mapStateToProps)(function (props: Props) {
  const {
    decSep,
    equalsPressed,
    imageOnly,
    imagePresent,
    memory,
    negRed,
    noAds,
    onImagePress,
    output,
    palette,
    showSubtotal,
    subtotal,
    theme,
    thouSep,
  } = props;

  const {buttonMem, buttonOp, displayDigits, displayDigitsNeg} =
    getCalcTheme(theme);

  const scrollRef: React.MutableRefObject<ScrollView | null> = useRef(null);

  const negative = equalsPressed && negRed && Number(output) < 0;

  const textColor = negative ? displayDigitsNeg.color : displayDigits.color;

  const formattedDisplay: Array<JSX.Element> = [];

  const fontFamily = getFont();
  const fontFamilyBold = getFont(true);

  const fontSize = hp(noAds ? 6.7 : 6.5) * HEIGHT_RATIO;

  let result = formatOutput(output, decSep, thouSep);
  result = result.padStart(40 - result.length, ' ');

  if (palette) {
    [...result].forEach((c, index) => {
      switch (c) {
        case '÷':
        case '×':
        case '+':
        case '−':
        case '^':
        case '%':
          formattedDisplay.push(
            <Text
              key={index}
              style={{color: buttonMem.backgroundColor, fontFamily}}>
              {c}
            </Text>,
          );
          break;

        case '(':
        case ')':
          formattedDisplay.push(
            <Text
              key={index}
              style={{color: buttonOp.backgroundColor, fontFamily}}>
              {c}
            </Text>,
          );
          break;

        default:
          formattedDisplay.push(
            <Text key={index} style={{color: textColor, fontFamily}}>
              {c}
            </Text>,
          );
      }
    });
  }

  const content = palette ? (
    <Text
      ellipsizeMode="clip"
      numberOfLines={1}
      style={[
        styles.displayDigits,
        {
          fontFamily: fontFamilyBold,
          fontSize,
        },
      ]}
      testID="result">
      {formattedDisplay.map(e => e)}
    </Text>
  ) : (
    <Text
      ellipsizeMode="clip"
      numberOfLines={1}
      style={[
        styles.displayDigits,
        {
          color: textColor,
          fontFamily: fontFamilyBold,
          fontSize,
        },
      ]}
      testID="result">
      {result}
    </Text>
  );

  const scrollResult = (
    <ScrollView
      horizontal={true}
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}>
      {content}
    </ScrollView>
  );

  const memoryClear = memory === '0';

  useEffect(() => {
    if (!imageOnly) {
      scrollRef?.current?.scrollToEnd();
    }
  });

  return (
    <>
      <View style={styles.displayTop}>
        {!imageOnly && !memoryClear && (
          <View style={styles.displayTopMemory}>
            <Text
              numberOfLines={1}
              style={[
                styles.displayLastMemory,
                {color: displayDigits.color, fontFamily: fontFamilyBold},
              ]}>
              <Text style={{color: buttonMem.backgroundColor, fontFamily}}>
                Memory{' '}
              </Text>
              {formatOutput(memory, decSep, thouSep)}
            </Text>
          </View>
        )}
        <View style={styles.displayTopLastOps}>
          <View style={{flexDirection: 'row'}}>
            {imagePresent && (
              <View style={{paddingRight: wp(3)}}>
                <Pressable
                  onPress={() => {
                    anal('calc_menu_image');
                    onImagePress();
                  }}
                  testID="menu-image">
                  {() => (
                    <MDIcon
                      name="image"
                      size={wp(6)}
                      style={{color: displayDigits.color}}
                    />
                  )}
                </Pressable>
              </View>
            )}
            {!imageOnly && showSubtotal && subtotal && subtotal !== '0' && (
              <View style={{paddingRight: wp(3)}}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.displayLastMemory,
                    {
                      color: buttonMem.backgroundColor,
                      fontFamily: fontFamilyBold,
                    },
                  ]}>
                  {formatOutput(subtotal, decSep, thouSep)}
                </Text>
              </View>
            )}
          </View>
        </View>
        <Text style={{fontFamily: fontFamilyBold, fontSize: wp(4)}}> </Text>
      </View>
      <View style={{paddingVertical: hp(noAds ? 0.8 : 0.6)}} />
      {!imageOnly && scrollResult}
    </>
  );
});
