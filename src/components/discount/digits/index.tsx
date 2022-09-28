import React from 'react';
import {StyleSheet, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {getCalcTheme} from '../../../helpers/themes';
import {RootState} from '../../../redux';
import {CalcButton} from '../../button';

type pressKey = ((key: string | undefined) => void) | undefined;

type Props = {
  decSep: string;
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
  const {decSep, onLongPress, onMenuPress, onPress, theme} = props;

  const {buttonBack, buttonClear, buttonDigit, buttonDot, buttonOp} =
    getCalcTheme(theme);

  return (
    <View style={styles.digits} testID="digits">
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonClear.backgroundColor}
          color={buttonClear.color}
          digitIcon="dots-horizontal"
          fontSize={hp(4.25)}
          iconSize={hp(4.25)}
          onPress={onMenuPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="▼"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="( )"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="÷"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="7"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="8"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="9"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="×"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="4"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="5"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="6"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="−"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="1"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="2"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="3"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonOp.backgroundColor}
          color={buttonOp.color}
          digit="+"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="0"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDigit.backgroundColor}
          color={buttonDigit.color}
          digit="00"
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonDot.backgroundColor}
          color={buttonDot.color}
          digit={decSep}
          fontSize={hp(4.25)}
          onPress={onPress}
        />
        <CalcButton
          backgroundColor={buttonBack.backgroundColor}
          color={buttonBack.color}
          digitIcon="backspace-outline"
          fontSize={hp(4.25)}
          iconSize={hp(4.25)}
          onLongPress={onLongPress}
          onPress={onPress}
        />
      </View>
    </View>
  );
});
