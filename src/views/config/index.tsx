import React from 'react';
import {ScrollView, View} from 'react-native';
import {Caption} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {AdConsent} from '../../components/ads/adConsent';
import {AdProviders} from '../../components/ads/adProviders';
import {APP_NAME_VER} from '../../helpers/constants';
import {ThemeContext} from '../../helpers/themes';
import {getFont} from '../../helpers/utils';
import {RootState} from '../../redux';
import {CalculatorConfig} from './calculator';
import {Data} from './data';
import {General} from './general';

type Props = {
  noAds: boolean;
};

const mapStateToProps = (state: RootState) => ({
  noAds: state.purchases.noAds,
});

export const Config = connect(mapStateToProps)(function (props: Props) {
  const {noAds} = props;

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {backgroundColor3, iconColor} = theme;

        const fontFamilyBold = getFont(true);

        return (
          <>
            <ScrollView
              style={{
                backgroundColor: backgroundColor3,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Caption
                  style={[
                    {
                      color: iconColor,
                      fontFamily: fontFamilyBold,
                      padding: wp(2),
                    },
                  ]}
                  testID="version">
                  {APP_NAME_VER}
                </Caption>
              </View>
              <Data />
              <CalculatorConfig />
              <General />
              <View style={{paddingVertical: wp(3)}} />
            </ScrollView>
            {!noAds && <AdConsent />}
            {!noAds && <AdProviders />}
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
});
