import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {HEIGHT_RATIO, MIN_HEIGHT} from '../../helpers/constants';
import {getButtonShape} from '../../helpers/pickers';
import {getFont} from '../../helpers/utils';
import {RootState} from '../../redux';

type Props = {
  backgroundColor: string;
  color: string;
  digit?: string;
  digitIcon?: string;
  fontSize?: number;
  noAds?: boolean;
  onLongPress?: (key?: string) => void;
  onPress?: (key?: string) => void;
  shape?: number;
};

const mapStateToProps = (state: RootState) => ({
  noAds: state.purchases.noAds,
  shape: state.config.shape,
});

export const CalcButton = connect(mapStateToProps)(function (props: Props) {
  const {
    backgroundColor,
    color,
    digit,
    digitIcon,
    fontSize,
    noAds,
    onLongPress,
    onPress,
    shape,
  } = props;

  const scaleFont = () => {
    return hp(5);
  };

  const scaleMargin = () => {
    return hp(0.5);
  };

  const scalePadding = () => {
    const scale = noAds ? (MIN_HEIGHT ? 1.5 : 1.85) : MIN_HEIGHT ? 1.2 : 1.2;

    return hp(scale) * HEIGHT_RATIO;
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor,
      borderRadius: getButtonShape(shape),
      color,
      fontFamily: getFont(true),
      fontSize: fontSize || scaleFont(),
      margin: scaleMargin(),
      paddingVertical: scalePadding(),
      textAlign: 'center',
      width: wp(20),
    },
  });

  return (
    <Pressable
      onLongPress={() => onLongPress?.(digit || digitIcon)}
      onPress={() => onPress?.(digit || digitIcon)}
      testID={`digit-${digit}`}>
      {() => (
        <View>
          {digit && (
            <Text style={styles.button} testID={`_${digit}_`}>
              {digit}
            </Text>
          )}
          {digitIcon && (
            <Text style={styles.button} testID={digitIcon}>
              {' '}
              <MDIcon
                name={digitIcon}
                size={scaleFont() * 0.9}
                style={{color}}
              />{' '}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
});
