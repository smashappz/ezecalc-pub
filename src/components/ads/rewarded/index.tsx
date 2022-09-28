import {RewardedAd} from '@react-native-admob/admob';
import {AdsConsentStatus} from '@react-native-firebase/admob';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {AD_UNIT_REW} from '../../../helpers/constants';
import i18n from '../../../helpers/i18n';
import {ThemeContext} from '../../../helpers/themes';
import {anal} from '../../../helpers/utils';
import {RootState} from '../../../redux';

type Props = {
  consent: number;
  isEEA: boolean;
};

const mapStateToProps = (state: RootState) => ({
  consent: state.ads.consent,
  isEEA: state.ads.isEEA,
});

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  rowLeft: {justifyContent: 'center', width: '20%'},
  rowRight: {justifyContent: 'center', width: '80%'},
  switchLeft: {
    alignItems: 'flex-start',
    flex: 3,
  },
  switchRight: {
    alignItems: 'flex-end',
    flex: 1,
  },
  switchView: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: wp(4.8),
  },
});

export const Rewarded = connect(mapStateToProps)(function (props: Props) {
  const {consent, isEEA} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [requested, setRequested] = useState<boolean>(false);

  useEffect(() => {
    if (requested && !loading) {
      setLoading(true);

      const newAd = RewardedAd.createAd(AD_UNIT_REW, {
        requestOptions: {
          requestNonPersonalizedAdsOnly:
            isEEA && consent === AdsConsentStatus.NON_PERSONALIZED,
        },
        showOnLoaded: true,
      });

      newAd.addEventListener('adLoaded', () => {
        setRequested(false);
        setLoading(false);
      });
    }
  }, [loading, requested]);

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {actionButtonColor, backgroundColor3, color, iconColor, modal} =
          theme;

        return (
          <Pressable
            onPress={() => {
              anal('ads_rewarded');
              setRequested(true);
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? modal : backgroundColor3,
              },
            ]}
            testID="view-ads">
            {() => (
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View style={styles.row}>
                    {requested ? (
                      <ActivityIndicator
                        animating={true}
                        color={actionButtonColor}
                        testID="spinner"
                      />
                    ) : (
                      <>
                        <View style={styles.rowLeft} testID="panel">
                          <MDIcon
                            name="television"
                            size={wp(6)}
                            style={{color: iconColor}}
                          />
                        </View>
                        <View style={styles.rowRight}>
                          <Text style={{color, fontWeight: 'bold'}}>
                            {i18n.t('config.television')}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>
                </View>
                <View style={styles.switchRight}></View>
              </View>
            )}
          </Pressable>
        );
      }}
    </ThemeContext.Consumer>
  );
});
