import {AdsConsent, AdsConsentStatus} from '@react-native-firebase/admob';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React from 'react';
import {Image, Modal, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Paragraph} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {MIN_HEIGHT} from '../../../helpers/constants';
import i18n from '../../../helpers/i18n';
import {ThemeContext} from '../../../helpers/themes';
import {anal, getFont} from '../../../helpers/utils';
import {RootState} from '../../../redux';
import {setConsent, setShowConsent} from '../../../redux/ads';

type Props = {
  consent: number;
  setConsent: ActionCreatorWithPayload<unknown, string>;
  setShowConsent: ActionCreatorWithPayload<unknown, string>;
  showConsent: boolean;
};

const mapStateToProps = (state: RootState) => ({
  consent: state.ads.consent,
  showConsent: state.ads.showConsent,
});

const mapDispatchToProps = {
  setConsent,
  setShowConsent,
};

const styles = StyleSheet.create({
  modalHeader: {
    alignItems: 'center',
    padding: wp(3),
  },
  modalHdrImage: {
    height: hp(8.4),
    width: wp(20.8),
  },
});

export const AdConsent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(function (props: Props) {
  const {consent, setConsent, setShowConsent, showConsent} = props;

  const onConsent = (status: boolean) => {
    const updatedStatus = status
      ? AdsConsentStatus.PERSONALIZED
      : AdsConsentStatus.NON_PERSONALIZED;

    AdsConsent.setStatus(updatedStatus);

    setConsent(updatedStatus);
    setShowConsent(false);
  };

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {color, modal, primary} = theme;

        const fontFamily = getFont();
        const fontFamilyBold = getFont(true);

        return (
          <Modal
            animationType="fade"
            onRequestClose={() => {
              if (consent !== AdsConsentStatus.UNKNOWN) {
                setShowConsent(false);
              }
            }}
            style={{backgroundColor: modal, margin: 0}}
            testID="consent-modal"
            visible={showConsent}>
            <ScrollView
              contentContainerStyle={{
                backgroundColor: modal,
                height: '100%',
                padding: wp(2),
              }}>
              {MIN_HEIGHT && (
                <View style={styles.modalHeader}>
                  <Image
                    source={require('../../../../assets/eu3.jpg')}
                    style={styles.modalHdrImage}
                    testID="hdr-img"
                  />
                  <Paragraph
                    style={{
                      color: primary,
                      fontFamily,
                      fontSize: wp(5),
                      paddingTop: wp(6),
                    }}
                    testID="hdr-txt">
                    {i18n.t('ads.personalize')}
                  </Paragraph>
                </View>
              )}
              <View
                style={{
                  paddingHorizontal: wp(4),
                  paddingTop: wp(2),
                }}>
                <Paragraph
                  style={{color, fontFamily: fontFamilyBold}}
                  testID="personalize">
                  {consent === AdsConsentStatus.PERSONALIZED
                    ? i18n.t('ads.personalize_on')
                    : i18n.t('ads.personalize_off')}
                  {i18n.t('ads.personalize_options')}
                </Paragraph>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingBottom: wp(3),
                }}>
                <Paragraph
                  style={{
                    color,
                    fontFamily,
                    padding: wp(4),
                  }}
                  testID="partners">
                  {i18n.t('ads.personalize_partners')}
                </Paragraph>
                <View style={{flexDirection: 'row', padding: wp(2)}}>
                  {/* 
                // @ts-ignore */}
                  <Button
                    color="#c00000"
                    compact={true}
                    mode="contained"
                    onPress={() => {
                      anal('ads_consent_false');
                      onConsent(false);
                    }}
                    testID="no"
                    uppercase={false}>
                    {i18n.t('ads.agree_no')}
                  </Button>
                  <View style={{paddingHorizontal: wp(3)}} />
                  {/* 
                // @ts-ignore */}
                  <Button
                    color="#008000"
                    compact={true}
                    mode="contained"
                    onPress={() => {
                      anal('ads_consent_true');
                      onConsent(true);
                    }}
                    testID="yes"
                    uppercase={false}>
                    {i18n.t('ads.agree_yes')}
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Modal>
        );
      }}
    </ThemeContext.Consumer>
  );
});
