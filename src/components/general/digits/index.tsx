import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {getCalcTheme} from '../../../helpers/themes';
import {RootState} from '../../../redux';
import {CalcButton} from '../../button';

type pressKey = ((key: string | undefined) => void) | undefined;

type Props = {
  decSep: string;
  imageOnly: boolean;
  onLongPress?: pressKey;
  onMenuPress?: () => void;
  onPress?: pressKey;
  theme: number;
};

const mapStateToProps = (state: RootState) => ({
  decSep: state.config.decSep,
});

const styles = StyleSheet.create({
  digits: {
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export const Digits = connect(mapStateToProps)(function (props: Props) {
  const {decSep, imageOnly, onLongPress, onMenuPress, onPress, theme} = props;

  const {
    buttonBack,
    buttonClear,
    buttonDigit,
    buttonDot,
    buttonExtra,
    buttonEquals,
    buttonMem,
    buttonOp,
  } = getCalcTheme(theme);

  if (imageOnly) return null;

  return (
    <View style={styles.digits} testID="digits">
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonMem.backgroundColor}
          color={buttonMem.color}
          digit="mc"
          fontSize={wp(6)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonMem.backgroundColor}
          color={buttonMem.color}
          digit="mr"
          fontSize={wp(6)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonMem.backgroundColor}
          color={buttonMem.color}
          digit="m-"
          fontSize={wp(6)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonMem.backgroundColor}
          color={buttonMem.color}
          digit="m+"
          fontSize={wp(6)}
          onPress={onPress}
        />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="±"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="𝑥²"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="√𝑥"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="1/𝑥"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="𝑥³"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="3√𝑥"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="𝑥^y"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="𝑒^𝑥"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="sin"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="cos"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="tan"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="log"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="ln"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="lg2"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="rnd"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="π"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="𝑒"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="ϕ"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="√½"
            onPress={onPress}
          />
          <CalcButton
            backgroundColor={buttonExtra.backgroundColor}
            color={buttonExtra.color}
            digit="√2"
            onPress={onPress}
          />
        </View>
      </ScrollView>
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonClear.backgroundColor}
          color={buttonClear.color}
          digitIcon="dots-horizontal"
          onPress={onMenuPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="%"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="( )"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="÷"
          onPress={onPress}
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="7"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="8"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="9"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="×"
          onPress={onPress}
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="4"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="5"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="6"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="−"
          onPress={onPress}
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="1"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="2"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="3"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="+"
          onPress={onPress}
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="0"
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDot.backgroundColor}
          color={buttonDot.color}
          digit={decSep}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonBack.backgroundColor}
          color={buttonBack.color}
          digitIcon="backspace-outline"
          onLongPress={onLongPress}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonEquals.backgroundColor}
          color={buttonEquals.color}
          digit="="
          onPress={onPress}
        />
      </View>
    </View>
  );
});
