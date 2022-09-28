import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Paragraph, Subheading, Text} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import i18n from '../../../helpers/i18n';
import {ThemeContext} from '../../../helpers/themes';
import {anal, browser, getFont} from '../../../helpers/utils';
import {RootState} from '../../../redux';
import {AdProvider, setShowProviders} from '../../../redux/ads';

type Props = {
  adProviders: Array<AdProvider>;
  setShowProviders: ActionCreatorWithPayload<unknown, string>;
  showProviders: boolean;
};

const renderItem =
  (theme: Record<string, string>) =>
  // eslint-disable-next-line react/display-name
  ({item}: {item: AdProvider}) => {
    return (
      <Pressable
        onPress={() => browser(item.privacyPolicyUrl)}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? theme.backgroundColor3 : theme.modal,
          },
        ]}
        testID="list-item">
        {() => (
          <Text
            numberOfLines={1}
            style={[
              styles.provider,
              {
                color: theme.link,
                fontFamily: getFont(),
              },
            ]}>
            • {item.companyName}
          </Text>
        )}
      </Pressable>
    );
  };

const mapStateToProps = (state: RootState) => ({
  adProviders: state.ads.adProviders,
  showProviders: state.ads.showProviders,
});

const mapDispatchToProps = {
  setShowProviders,
};

const styles = StyleSheet.create({
  list: {paddingTop: wp(4)},
  modalHeader: {
    alignItems: 'center',
    padding: wp(3),
  },
  modalHdrImage: {
    height: hp(8.4),
    width: wp(20.8),
  },
  provider: {
    padding: wp(0.6),
    paddingLeft: wp(4),
  },
});

export const AdProviders = connect(
  mapStateToProps,
  mapDispatchToProps,
)(function (props: Props) {
  const {adProviders, setShowProviders, showProviders} = props;

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {color, link, modal, primary} = theme;

        const fontFamily = getFont();
        const fontFamilyBold = getFont(true);

        return (
          <Modal
            animationType="fade"
            onRequestClose={() => setShowProviders(false)}
            style={{backgroundColor: modal, margin: 0}}
            visible={showProviders}>
            <ScrollView
              contentContainerStyle={{
                backgroundColor: modal,
                justifyContent: 'center',
                padding: wp(2),
              }}
              testID="scroll-view">
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
                  {i18n.t('ads.data_use')}
                </Paragraph>
              </View>
              <View
                style={{
                  paddingHorizontal: wp(4),
                  paddingTop: wp(2),
                }}>
                <Paragraph
                  style={{color, fontFamily: fontFamilyBold}}
                  testID="partners">
                  {i18n.t('ads.partners')}
                </Paragraph>
              </View>
              <Subheading
                style={{
                  color: primary,
                  fontFamily: fontFamilyBold,
                  padding: wp(4),
                }}
                testID="ads">
                {i18n.t('ads.advertising')}
              </Subheading>
              <Paragraph
                style={{
                  color,
                  fontFamily,
                  paddingHorizontal: wp(4),
                  paddingBottom: wp(2),
                }}
                testID="info">
                {i18n.t('ads.partners_info')}
              </Paragraph>
              <FlatList
                data={adProviders}
                initialNumToRender={200}
                getItemLayout={(_, index) => ({
                  length: hp(2.5),
                  offset: hp(2.5) * index,
                  index,
                })}
                keyExtractor={(item: AdProvider) => item.companyName}
                maxToRenderPerBatch={200}
                renderItem={renderItem(theme)}
                removeClippedSubviews={true}
                style={styles.list}
                testID="ads-list"
                updateCellsBatchingPeriod={75}
                windowSize={8}
              />
              <Subheading
                style={{
                  color: primary,
                  fontFamily: fontFamilyBold,
                  padding: wp(4),
                }}
                testID="analytics">
                {i18n.t('ads.analytics')}
              </Subheading>
              <Paragraph
                style={{
                  color,
                  fontFamily,
                  paddingHorizontal: wp(4),
                  paddingBottom: wp(4),
                }}
                testID="anal-info">
                {i18n.t('ads.analytics_info')}
              </Paragraph>
              <Pressable
                onPress={() => {
                  anal('ads_provider_privacy_firebase');
                  browser('https://firebase.google.com/support/privacy');
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? theme.backgroundColor3
                      : theme.modal,
                  },
                ]}
                testID="privacy-fb">
                {() => (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: link,
                      fontFamily,
                      padding: wp(0.6),
                      paddingLeft: wp(4),
                    }}>
                    {i18n.t('ads.analytics_fb')}
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  anal('ads_provider_privacy_sentry');
                  browser('https://sentry.io/privacy');
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? theme.backgroundColor3
                      : theme.modal,
                  },
                ]}
                testID="privacy-sentry">
                {() => (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: link,
                      fontFamily,
                      padding: wp(0.6),
                      paddingLeft: wp(4),
                    }}>
                    {i18n.t('ads.analytics_sentry')}
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  anal('ads_provider_privacy_smashappz');
                  browser('https://smashappz.com/privacy');
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? theme.backgroundColor3
                      : theme.modal,
                  },
                ]}
                testID="privacy-smash">
                {() => (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: link,
                      fontFamily,
                      padding: wp(0.6),
                      paddingLeft: wp(4),
                    }}>
                    {i18n.t('ads.analytics_smash')}
                  </Text>
                )}
              </Pressable>
              <View
                style={{
                  paddingVertical: wp(3),
                }}></View>
            </ScrollView>
          </Modal>
        );
      }}
    </ThemeContext.Consumer>
  );
});
