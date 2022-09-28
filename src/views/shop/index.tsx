import {User} from '@react-native-community/google-signin';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React, {useEffect, useRef, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Caption, Text} from 'react-native-paper';
import Purchases, {
  PurchasesError,
  PurchasesOffering,
} from 'react-native-purchases';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  ENTITLEMENT_DISCOUNT,
  ENTITLEMENT_NO_ADS,
  MIN_WIDTH,
  OFFERINGS,
  OFFER_DISCOUNT,
  OFFER_NO_ADS,
} from '../../helpers/constants';
import {signIn, signOut} from '../../helpers/drive';
import i18n from '../../helpers/i18n';
import {isDarkTheme, ThemeContext} from '../../helpers/themes';
import {anal, getFont, setData} from '../../helpers/utils';
import {RootState} from '../../redux';
import {
  setDiscount,
  setIsPurchasing,
  setIsRestoring,
  setNoAds,
  setPurchased,
} from '../../redux/purchase';

type Props = {
  discount: boolean;
  isPurchasing: boolean;
  isRestoring: boolean;
  noAds: boolean;
  purchased: boolean;
  setDiscount: ActionCreatorWithPayload<unknown, string>;
  setIsPurchasing: ActionCreatorWithPayload<unknown, string>;
  setIsRestoring: ActionCreatorWithPayload<unknown, string>;
  setNoAds: ActionCreatorWithPayload<unknown, string>;
  setPurchased: ActionCreatorWithPayload<unknown, string>;
};

const mapStateToProps = (state: RootState) => ({
  ...state.purchases,
});

const mapDispatchToProps = {
  setDiscount,
  setIsPurchasing,
  setIsRestoring,
  setNoAds,
  setPurchased,
};

const styles = StyleSheet.create({
  button: {marginTop: wp(6), width: '80%'},
  container: {
    paddingTop: wp(8),
  },
  email: {
    fontSize: wp(3),
    marginBottom: wp(5),
    paddingHorizontal: wp(10),
  },
  error: {
    color: 'red',
    padding: wp(4),
    paddingTop: wp(2),
  },
  image: {width: wp(20), height: wp(20)},
  offer: {
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: wp(4),
    marginVertical: wp(5),
    padding: wp(6),
    paddingRight: wp(4),
  },
  purchase: {
    fontSize: wp(4),
    paddingTop: wp(3),
  },
  text: {fontSize: wp(4)},
});

type Status = {
  msg: string;
  error?: boolean;
  ok?: boolean;
};

type RestoreStatus =
  | {
      discount?: boolean;
      noAds?: boolean;
    }
  | undefined;

export const Shop = connect(
  mapStateToProps,
  mapDispatchToProps,
)(function (props: Props) {
  const {
    discount,
    isPurchasing,
    isRestoring,
    noAds,
    setDiscount,
    setIsPurchasing,
    setIsRestoring,
    setNoAds,
    setPurchased,
  } = props;

  const scrollRef: React.MutableRefObject<ScrollView | null> = useRef(null);

  const [error, setError] = useState(false);
  const [discountStatus, setDiscountStatus] = useState<Status>({msg: ''});
  const [noAdsStatus, setNoAdsStatus] = useState<Status>({msg: ''});
  const [restoreStatus, setRestoreStatus] = useState<Status>({msg: ''});

  const purchaseOffer = async (
    offer: PurchasesOffering | null,
    entitlement: string,
    updateState: (activate: boolean) => void,
    updateStatus: (status: Status) => void,
  ) => {
    setError(false);

    if (isPurchasing) {
      updateStatus({msg: i18n.t('purchases.in_progress'), error: true});
      return;
    }

    if (!offer) {
      updateStatus({msg: i18n.t('purchases.invalid_offer'), error: true});
      return;
    }

    const lifetimeOffer = offer?.lifetime;

    if (!lifetimeOffer) {
      updateStatus({msg: i18n.t('purchases.err_offer'), error: true});
      return;
    }

    const user = (await signIn()) as User['user'];

    if (!user) {
      updateStatus({msg: i18n.t('purchases.err_user'), error: true});
      return;
    }

    try {
      setIsPurchasing(true);

      updateStatus({msg: i18n.t('purchases.checking'), ok: true});
      const restoreStatus = await restorePurchases();

      if (error || !restoreStatus) {
        setIsPurchasing(false);

        return;
      }

      if (
        !(
          (restoreStatus.discount && offer.identifier === OFFER_DISCOUNT) ||
          (restoreStatus.noAds && offer.identifier === OFFER_NO_ADS)
        )
      ) {
        updateStatus({msg: i18n.t('purchases.ordering'), ok: true});

        await Purchases.logIn(user.id);

        const {purchaserInfo} = await Purchases.purchasePackage(lifetimeOffer);

        if (purchaserInfo?.entitlements?.active[entitlement]?.isActive) {
          setData('purchased', 'true');
          setPurchased(true);
        }

        updateState(true);
        updateStatus({msg: ''});
      }
    } catch (e: any) {
      const err = e as PurchasesError;

      if (!err.userCancelled) {
        updateStatus({msg: i18n.t('purchases.err_purchase'), error: true});
        setError(true);
      }
    } finally {
      updateStatus({msg: ''});
      setIsPurchasing(false);
    }
  };

  const restorePurchases = async (): Promise<RestoreStatus> => {
    setError(false);

    if (isRestoring) {
      setRestoreStatus({msg: i18n.t('purchases.in_progress2'), error: true});
      return;
    }

    const user = (await signIn()) as User['user'];

    if (!user) {
      setRestoreStatus({msg: i18n.t('purchases.err_user'), error: true});
      return;
    }

    const status: RestoreStatus = {};

    try {
      setRestoreStatus({msg: i18n.t('purchases.restoring'), ok: true});
      setIsRestoring(true);

      await Purchases.logIn(user.id);

      const purchaserInfo = await Purchases.restoreTransactions();
      let purchased = false;

      if (purchaserInfo && purchaserInfo.entitlements) {
        if (purchaserInfo.entitlements.active[ENTITLEMENT_DISCOUNT]?.isActive) {
          purchased = true;
          status.discount = true;
          setDiscount(true);
        }

        if (purchaserInfo.entitlements.active[ENTITLEMENT_NO_ADS]?.isActive) {
          purchased = true;
          status.noAds = true;
          setNoAds(true);
        }
      }

      if (purchased) {
        setData('purchased', 'true');
        setPurchased(true);
      }

      setRestoreStatus({msg: ''});
    } catch (e: any) {
      setRestoreStatus({msg: i18n.t('purchases.err_restore'), error: true});
      setError(true);
    } finally {
      setIsRestoring(false);
    }

    return status;
  };

  useEffect(() => {
    if (error) {
      signOut();
    }
  }, [error]);

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {backgroundColor3, borderColor, color, iconColor, name} = theme;
        const {current: noAdsOffer} = OFFERINGS;

        const discountOffer = OFFERINGS.all[OFFER_DISCOUNT];

        const isDark = isDarkTheme(name);

        const discountPic = require('../../../assets/discount.png');

        const noAdsPic = isDark
          ? require('../../../assets/noads2.png')
          : require('../../../assets/noads.png');

        const restorePic = isDark
          ? require('../../../assets/restore2.png')
          : require('../../../assets/restore.png');

        const fontFamilyBold = getFont(true);

        const getStatus = (status: Status, colour = color) =>
          status.msg ? (
            <Caption
              style={[
                styles.purchase,
                {
                  color: status.error
                    ? 'red'
                    : status.ok
                    ? isDark
                      ? 'lightgreen'
                      : 'green'
                    : colour,
                  fontFamily: fontFamilyBold,
                },
              ]}
              testID="status-msg">
              {status.msg}
            </Caption>
          ) : null;

        const purchasedAll = discount && noAds;

        const discountPrice =
          discountOffer?.lifetime?.product.price_string || '';
        const noAdsPrice = noAdsOffer?.lifetime?.product.price_string || '';

        return (
          <ScrollView
            ref={scrollRef}
            style={{
              backgroundColor: backgroundColor3,
            }}>
            <View style={styles.container}>
              <Text
                style={[
                  styles.text,
                  {
                    color,
                    fontFamily: fontFamilyBold,
                    marginVertical: wp(5),
                    paddingHorizontal: wp(10),
                  },
                ]}>
                {i18n.t('purchases.info')}
                <MDIcon name="cart" size={wp(6)} style={{color: iconColor}} />
                {i18n.t('purchases.info2')}
              </Text>
              {noAds || noAdsPrice ? (
                <View style={[styles.offer, {borderColor}]}>
                  <View style={{flex: 1}}>
                    <Image
                      source={noAdsPic}
                      style={{width: wp(20), height: wp(17)}}
                    />
                  </View>
                  <View style={{flex: 2}}>
                    {noAds && (
                      <Text
                        style={[
                          styles.text,
                          {color, fontFamily: fontFamilyBold},
                        ]}>
                        {i18n.t('purchases.no_ads_sold')}
                      </Text>
                    )}
                    {!noAds && noAdsPrice ? (
                      <>
                        <Text
                          style={[
                            styles.text,
                            {color, fontFamily: fontFamilyBold},
                          ]}>
                          {i18n.t('purchases.no_ads_upsell')}
                        </Text>
                        <Button
                          compact={true}
                          mode="contained"
                          onPress={() => {
                            anal(`store_purch_noads`);

                            purchaseOffer(
                              noAdsOffer,
                              ENTITLEMENT_NO_ADS,
                              setNoAds,
                              setNoAdsStatus,
                            );
                          }}
                          style={styles.button}
                          testID="purchase-btn-noads"
                          uppercase={false}>
                          {MIN_WIDTH && i18n.t('purchases.buy')}
                          {` ${noAdsPrice}`}
                        </Button>
                        {getStatus(noAdsStatus)}
                      </>
                    ) : null}
                  </View>
                </View>
              ) : null}
              {discount || discountPrice ? (
                <View style={[styles.offer, {borderColor}]}>
                  <View style={{flex: 1}}>
                    <Image
                      source={discountPic}
                      style={{width: wp(20), height: wp(20)}}
                    />
                  </View>
                  <View style={{flex: 2}}>
                    {discount && (
                      <>
                        <Text
                          style={[
                            styles.text,
                            {color, fontFamily: fontFamilyBold},
                          ]}>
                          {i18n.t('purchases.discount_sold')}
                          <MDIcon
                            name="calculator"
                            size={wp(6)}
                            style={{color: iconColor}}
                          />
                          {i18n.t('purchases.discount_sold2')}
                          <MDIcon
                            name="dots-horizontal"
                            size={wp(6)}
                            style={{color: iconColor}}
                          />
                          {i18n.t('purchases.discount_sold3')}
                        </Text>
                      </>
                    )}
                    {!discount && discountPrice ? (
                      <>
                        <Text
                          style={[
                            styles.text,
                            {
                              color,
                              fontFamily: fontFamilyBold,
                              paddingBottom: wp(5),
                            },
                          ]}>
                          {i18n.t('purchases.discount_upsell')}
                        </Text>
                        <Button
                          compact={true}
                          mode="contained"
                          onPress={() => {
                            anal(`store_purch_discount`);

                            purchaseOffer(
                              discountOffer,
                              ENTITLEMENT_DISCOUNT,
                              setDiscount,
                              setDiscountStatus,
                            );
                          }}
                          style={styles.button}
                          testID="purchase-btn-discount"
                          uppercase={false}>
                          {MIN_WIDTH && i18n.t('purchases.buy')}
                          {` ${discountPrice}`}
                        </Button>
                        {getStatus(discountStatus)}
                      </>
                    ) : null}
                  </View>
                </View>
              ) : null}
              {!purchasedAll && (
                <View style={[styles.offer, {borderColor}]}>
                  <View style={{flex: 1}}>
                    <Image source={restorePic} style={styles.image} />
                  </View>
                  <View style={{flex: 2}}>
                    <Text
                      style={[
                        styles.text,
                        {color, fontFamily: fontFamilyBold},
                      ]}>
                      {i18n.t('purchases.restore_upsell')}
                    </Text>
                    <Button
                      compact={true}
                      mode="contained"
                      onPress={() => {
                        anal(`store_restore`);

                        restorePurchases();
                      }}
                      style={styles.button}
                      testID="restore-btn"
                      uppercase={false}>
                      {i18n.t('purchases.restore')}
                    </Button>
                    {getStatus(restoreStatus)}
                  </View>
                </View>
              )}
              {error ? (
                <Caption
                  style={[styles.error, {fontFamily: fontFamilyBold}]}
                  testID="error">
                  {error}
                </Caption>
              ) : null}
            </View>
          </ScrollView>
        );
      }}
    </ThemeContext.Consumer>
  );
});
