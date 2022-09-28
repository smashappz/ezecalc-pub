import React from 'react';
import {Image, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import i18n from '../../helpers/i18n';
import {isDarkTheme, ThemeContext} from '../../helpers/themes';
import {getFont} from '../../helpers/utils';

type Props = {
  imagePresent: boolean;
  itemCount: number;
  loading: boolean;
};

export const Loading = function (props: Props) {
  const {imagePresent, itemCount, loading} = props;
  const hasItems = itemCount > 0;

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {actionButtonColor, color, name} = theme;
        const isDark = isDarkTheme(name);

        const noDataPic = isDark
          ? require('../../../assets/empty2.jpg')
          : require('../../../assets/empty.jpg');

        const loadOrEmpty = !hasItems ? (
          loading ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}
              testID="loading">
              <ActivityIndicator animating={true} color={actionButtonColor} />
            </View>
          ) : imagePresent ? null : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: wp(8),
              }}>
              <Text
                style={{
                  color,
                  fontFamily: getFont(true),
                  fontSize: wp(4),
                  paddingBottom: wp(8.9),
                }}
                testID="no-data">
                {i18n.t('app.no_data')}
              </Text>
              <Image
                source={noDataPic}
                style={{height: wp(50), width: wp(50)}}
                testID="nodata-pic"
              />
            </View>
          )
        ) : null;

        return <>{loadOrEmpty}</>;
      }}
    </ThemeContext.Consumer>
  );
};
