import {BannerAd, BannerAdSize} from '@react-native-admob/admob';
import {AdsConsentStatus} from '@react-native-firebase/admob';
import React from 'react';
import {connect} from 'react-redux';
import {AD_UNIT} from '../../../helpers/constants';
import {RootState} from '../../../redux';

type Props = {
  consent: number;
  isEEA: boolean;
};

const mapStateToProps = (state: RootState) => ({
  consent: state.ads.consent,
  isEEA: state.ads.isEEA,
});

export const Banner = connect(mapStateToProps)(function (props: Props) {
  const {consent, isEEA} = props;

  const ad = (
    <BannerAd
      requestOptions={{
        requestNonPersonalizedAdsOnly:
          isEEA && consent === AdsConsentStatus.NON_PERSONALIZED,
      }}
      size={BannerAdSize.ADAPTIVE_BANNER}
      unitId={AD_UNIT}
    />
  );

  return <>{ad}</>;
});
