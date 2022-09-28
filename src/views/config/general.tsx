import {AdsConsentStatus} from '@react-native-firebase/admob';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Button, Switch, Text, Title} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {Rewarded} from '../../components/ads/rewarded';
import {
  APP_NAME,
  APP_NAME_VER,
  DEV_URL,
  PLAY_URL,
} from '../../helpers/constants';
import i18n from '../../helpers/i18n';
import {ThemeContext} from '../../helpers/themes';
import {anal, browser, getFont, setData} from '../../helpers/utils';
import {RootState} from '../../redux';
import {setShowConsent, setShowProviders} from '../../redux/ads';
import {ConfigState, setDarkMode} from '../../redux/config';

type Props = ConfigState & {
  consent: number;
  isEEA: boolean;
  noAds: boolean;
  setDarkMode: ActionCreatorWithPayload<unknown, string>;
  setShowConsent: ActionCreatorWithPayload<unknown, string>;
  setShowProviders: ActionCreatorWithPayload<unknown, string>;
};

const mapStateToProps = (state: RootState) => ({
  ...state.config,
  consent: state.ads.consent,
  isEEA: state.ads.isEEA,
  noAds: state.purchases.noAds,
});

const mapDispatchToProps = {
  setDarkMode,
  setShowConsent,
  setShowProviders,
};

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
    padding: wp(4),
  },
});

export const General = connect(
  mapStateToProps,
  mapDispatchToProps,
)(function (props: Props) {
  const {
    consent,
    darkMode,
    isEEA,
    noAds,
    setDarkMode,
    setShowConsent,
    setShowProviders,
  } = props;

  const onChangeAds = () => {
    requestAnimationFrame(() => {
      anal(`config_ads_change`);
      setShowConsent(true);
    });
  };

  const onChangeAds2 = () => {
    requestAnimationFrame(() => {
      anal(`config_ads_providers`);
      setShowProviders(true);
    });
  };

  const onChangeDarkMode = (toggleTheme: () => void) => {
    const newState = !darkMode;
    anal(`config_darkmode_${newState.toString()}`);

    toggleTheme();

    setDarkMode(newState);
    setData('set_darkMode', newState.toString());
  };

  const privacy = () => {
    browser('https://smashappz.com/privacy');
  };

  const recommend = () => {
    const source = `(${i18n.t('diary.shared')} ${APP_NAME_VER})\n\n${PLAY_URL}`;

    try {
      Share.open({
        message: `${i18n.t('config.recommend2', {
          app: APP_NAME,
        })}\n\n${source}`,
        title: '',
      }).catch(err => {
        err && console.log(err);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => {
        const {backgroundColor3, color, iconColor, modal, primary} = theme;

        const consentStatus =
          consent === AdsConsentStatus.PERSONALIZED
            ? i18n.t('config.consent_yes')
            : i18n.t('config.consent_no');

        const fontFamilyBold = getFont(true);

        return (
          <View
            style={{
              paddingHorizontal: wp(3),
            }}>
            <Title
              style={{
                color: primary,
                fontFamily: fontFamilyBold,
                paddingHorizontal: wp(1),
                paddingTop: wp(4),
                paddingBottom: 0,
              }}
              testID="your_app">
              {i18n.t('config.title_gen')}
            </Title>
            <View style={styles.switchView}>
              <View style={styles.switchLeft}>
                <View style={styles.row}>
                  <View style={styles.rowLeft}>
                    <Icon
                      name="md-moon"
                      size={wp(6)}
                      style={{color: iconColor}}
                    />
                  </View>
                  <View style={styles.rowRight}>
                    <Text style={{color, fontFamily: fontFamilyBold}}>
                      {i18n.t('config.darkMode')}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.switchRight}>
                <Switch
                  color={iconColor}
                  onValueChange={() => onChangeDarkMode(toggleTheme)}
                  testID="darkmode"
                  value={darkMode}
                />
              </View>
            </View>
            <Pressable
              onPress={() => {
                anal(`config_store_listing`);
                browser(PLAY_URL);
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? modal : backgroundColor3,
                },
              ]}
              testID="view-apps">
              {() => (
                <View style={styles.switchView}>
                  <View style={styles.switchLeft}>
                    <View
                      style={{
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <View style={styles.rowLeft}>
                        <MDIcon
                          name="star-outline"
                          size={wp(6)}
                          style={{color: iconColor}}
                        />
                      </View>
                      <View style={styles.rowRight}>
                        <Text style={{color, fontFamily: fontFamilyBold}}>
                          {i18n.t('config.rating')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.switchRight}></View>
                </View>
              )}
            </Pressable>
            <Pressable
              onPress={() => {
                anal(`config_privacy`);
                privacy();
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? modal : backgroundColor3,
                },
              ]}
              testID="privacy1">
              {() => (
                <View style={styles.switchView}>
                  <View style={styles.switchLeft}>
                    <View
                      style={{
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <View style={styles.rowLeft}>
                        <MDIcon
                          name="safe-square-outline"
                          size={wp(6)}
                          style={{color: iconColor}}
                        />
                      </View>
                      <View style={styles.rowRight}>
                        <Text style={{color, fontFamily: fontFamilyBold}}>
                          {i18n.t('config.privacy')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.switchRight}></View>
                </View>
              )}
            </Pressable>
            <Pressable
              onPress={() => {
                anal(`config_recommend`);
                recommend();
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? modal : backgroundColor3,
                },
              ]}
              testID="recommend">
              {() => (
                <View style={styles.switchView}>
                  <View style={styles.switchLeft}>
                    <View style={styles.row}>
                      <View style={styles.rowLeft}>
                        <Icon
                          name="md-thumbs-up-outline"
                          size={wp(6)}
                          style={{color: iconColor}}
                        />
                      </View>
                      <View style={styles.rowRight}>
                        <Text style={{color, fontFamily: fontFamilyBold}}>
                          {i18n.t('config.recommend')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.switchRight}></View>
                </View>
              )}
            </Pressable>
            <Pressable
              onPress={() => {
                anal(`config_feedback`);

                browser(
                  `mailto:support@smashappz.com?subject=${i18n.t(
                    'config.emailFeedback',
                    {app: APP_NAME},
                  )}`,
                );
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? modal : backgroundColor3,
                },
              ]}
              testID="feedback">
              {() => (
                <View style={styles.switchView}>
                  <View style={styles.switchLeft}>
                    <View style={styles.row}>
                      <View style={styles.rowLeft}>
                        <MDIcon
                          name="email-outline"
                          size={wp(6)}
                          style={{color: iconColor}}
                        />
                      </View>
                      <View style={styles.rowRight}>
                        <Text style={{color, fontFamily: fontFamilyBold}}>
                          {i18n.t('config.feedback')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.switchRight}></View>
                </View>
              )}
            </Pressable>
            {!noAds && isEEA && (
              <View
                style={{
                  paddingBottom: wp(4),
                }}>
                <View style={[styles.switchView, {paddingBottom: wp(3)}]}>
                  <View style={styles.switchLeft}>
                    <View style={styles.row}>
                      <View style={styles.rowLeft}>
                        <Icon
                          name="md-easel"
                          size={wp(6)}
                          style={{color: iconColor}}
                        />
                      </View>
                      <View style={styles.rowRight}>
                        <Text style={{color, fontFamily: fontFamilyBold}}>
                          {consentStatus}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.switchRight}></View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {/* 
          // @ts-ignore */}
                  <Button
                    compact={true}
                    mode="contained"
                    onPress={() => {
                      onChangeAds();
                    }}
                    testID="consent"
                    uppercase={false}>
                    {i18n.t('config.consentChange')}
                  </Button>
                  {/* 
                // @ts-ignore */}
                  <Button
                    compact={true}
                    mode="contained"
                    onPress={() => {
                      onChangeAds2();
                    }}
                    testID="providers"
                    uppercase={false}>
                    {i18n.t('config.consentProviders')}
                  </Button>
                </View>
              </View>
            )}
            <Pressable
              onPress={() => {
                anal(`config_store_dev`);
                browser(DEV_URL);
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? modal : backgroundColor3,
                },
              ]}
              testID="ads">
              {() => (
                <View style={styles.switchView}>
                  <View style={styles.switchLeft}>
                    <View style={styles.row}>
                      <View style={styles.rowLeft}>
                        <MDIcon
                          name="eye"
                          size={wp(6)}
                          style={{color: iconColor}}
                        />
                      </View>
                      <View style={styles.rowRight}>
                        <Text style={{color, fontFamily: fontFamilyBold}}>
                          {i18n.t('config.view')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.switchRight}></View>
                </View>
              )}
            </Pressable>
            {!noAds && <Rewarded />}
          </View>
        );
      }}
    </ThemeContext.Consumer>
  );
});
