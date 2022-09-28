import {User} from '@react-native-community/google-signin';
import {
  AdsConsent,
  AdsConsentDebugGeography,
  AdsConsentStatus,
} from '@react-native-firebase/admob';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React, {Component} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Purchases from 'react-native-purchases';
import {connect} from 'react-redux';
import {AdConsent} from './components/ads/adConsent';
import {
  DEBUG,
  ENTITLEMENT_DISCOUNT,
  ENTITLEMENT_NO_ADS,
  PUB_ID,
  PURCHASED,
} from './helpers/constants';
import {signIn} from './helpers/drive';
import {
  darkTheme,
  isDarkTheme,
  lightTheme,
  ThemeContext,
  themes,
} from './helpers/themes';
import {getData} from './helpers/utils';
import {RootState} from './redux';
import {setAll as setAdsAll, setShowConsent} from './redux/ads';
import {setAll as setCalcAll} from './redux/calculator';
import {setAll as setDiscountAll} from './redux/discount';
import {setAll} from './redux/config';
import {setDiscount, setNoAds, setPurchased} from './redux/purchase';
import {App} from './views/app';

type Props = {
  noAds: boolean;
  setAll: ActionCreatorWithPayload<unknown, string>;
  setAdsAll: ActionCreatorWithPayload<unknown, string>;
  setCalcAll: ActionCreatorWithPayload<unknown, string>;
  setDiscountAll: ActionCreatorWithPayload<unknown, string>;
  setDiscount: ActionCreatorWithPayload<unknown, string>;
  setNoAds: ActionCreatorWithPayload<unknown, string>;
  setPurchased: ActionCreatorWithPayload<unknown, string>;
  setShowConsent: ActionCreatorWithPayload<unknown, string>;
};

type State = {
  theme: Record<string, string>;
  toggleTheme: FunctionConstructor;
};

const mapStateToProps = (state: RootState) => ({
  noAds: state.purchases.noAds,
});

const mapDispatchToProps = {
  setAll,
  setAdsAll,
  setCalcAll,
  setDiscountAll,
  setDiscount,
  setNoAds,
  setPurchased,
  setShowConsent,
};

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  class _ extends Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        theme: themes.dark,
        toggleTheme: (() =>
          this.setState(state => ({
            theme: state.theme === themes.dark ? themes.light : themes.dark,
          }))) as FunctionConstructor,
      };
    }

    async componentDidMount() {
      this.loadAppSettings();
      this.loadCalcSettings();
      this.loadDiscountSettings();
      this.loadPurchases();
    }

    loadAppSettings() {
      const {setAll} = this.props;

      Promise.all([
        getData('set_darkMode'),
        getData('set_decSep'),
        getData('set_freqList'),
        getData('set_freqTotal'),
        getData('set_inplace'),
        getData('set_negRed'),
        getData('set_palette'),
        getData('set_precision'),
        getData('set_radians'),
        getData('set_shape'),
        getData('set_speech'),
        getData('set_subtotal'),
        getData('set_theme'),
        getData('set_thouSep'),
        getData('set_vibrate'),
      ])
        .then(async (values: Array<string | null>) => {
          try {
            const darkMode = (values[0] ? values[0] : 'true') === 'true';
            const decSep = values[1] || '.';
            const freqList = values[2] ? JSON.parse(values[2]) : {};
            const freqTotal = Number(values[3] || 5);
            const inplace = (values[4] ? values[4] : 'false') === 'true';
            const negRed = values[5] === 'true';
            const palette = (values[6] ? values[6] : 'true') === 'true';
            const precision = Number(values[7] || 10);
            const radians = values[8] === 'true';
            const shape = Number(values[9] || 0);
            const speech = values[10] === 'true';
            const subtotal = (values[11] ? values[11] : 'true') === 'true';
            const theme = Number(values[12] || 0);
            const thouSep = values[13] || '';
            const vibrate = values[14] === 'true';

            setAll({
              darkMode,
              decSep,
              freqList,
              freqTotal,
              inplace,
              negRed,
              palette,
              precision,
              radians,
              shape,
              speech,
              subtotal,
              theme,
              thouSep,
              vibrate,
            });

            this.setState({
              theme: darkMode ? themes.dark : themes.light,
            });
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => console.log(e));
    }

    loadCalcSettings() {
      const {setCalcAll} = this.props;

      Promise.all([
        getData('calc_calculator'),
        getData('calc_memory'),
        getData('calc_output'),
      ])
        .then(async (values: Array<string | null>) => {
          try {
            const calculator = Number(values[0]) || 0;
            const memory = values[1] || '0';
            const output = values[2] || '0';

            setCalcAll({
              calculator,
              memory,
              output,
            });
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => console.log(e));
    }

    loadDiscountSettings() {
      const {setDiscountAll} = this.props;

      Promise.all([
        getData('disc_discount'),
        getData('disc_discount1'),
        getData('disc_discount2'),
        getData('disc_discount3'),
        getData('disc_fixedPrice'),
        getData('disc_numProducts'),
        getData('disc_pay'),
        getData('disc_price'),
        getData('disc_product1'),
        getData('disc_product2'),
        getData('disc_product3'),
        getData('disc_product4'),
        getData('disc_save'),
        getData('disc_tax'),
        getData('disc_type'),
        getData('disc_unitPrice'),
      ])
        .then(async (values: Array<string | null>) => {
          try {
            const discount = Number(values[0]) || '0';
            const discount1 = Number(values[1]) || '0';
            const discount2 = Number(values[2]) || '0';
            const discount3 = Number(values[3]) || '0';
            const fixedPrice = Number(values[4]) || '0';
            const numProducts = Number(values[5]) || '0';
            const pay = Number(values[6]) || '0';
            const price = values[7] || '0';
            const product1 = values[8] || '0';
            const product2 = values[9] || '0';
            const product3 = values[10] || '0';
            const product4 = values[11] || '0';
            const save = Number(values[12]) || '0';
            const tax = Number(values[13]) || '0';
            const type = Number(values[14]) || 1;
            const unitPrice = Number(values[15]) || '0';

            setDiscountAll({
              discount,
              discount1,
              discount2,
              discount3,
              fixedPrice,
              numProducts,
              pay,
              price,
              product1,
              product2,
              product3,
              product4,
              save,
              tax,
              type,
              unitPrice,
            });
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => console.log(e));
    }

    async loadPurchases() {
      const {setDiscount, setNoAds, setPurchased} = this.props;

      if (PURCHASED) {
        setDiscount(true);
        setNoAds(false);
        setPurchased(true);

        return;
      }

      const hasPurchased = await getData('purchased');

      if (!hasPurchased) {
        this.showAds();
        return;
      }

      try {
        const user = (await signIn()) as User['user'];

        if (!user) {
          this.showAds();
          return;
        }

        setPurchased(true);

        const {purchaserInfo} = await Purchases.logIn(user.id);

        setDiscount(
          purchaserInfo.entitlements.active[ENTITLEMENT_DISCOUNT].isActive,
        );

        const noAds =
          purchaserInfo.entitlements.active[ENTITLEMENT_NO_ADS].isActive;

        setNoAds(noAds);

        if (!noAds) {
          this.showAds();
        }
      } catch (e) {
        console.log(e);
      }
    }

    showAds() {
      const {setAdsAll, setShowConsent} = this.props;

      Promise.all([
        AdsConsent.requestInfoUpdate([PUB_ID]),
        AdsConsent.getAdProviders(),
      ])
        .then(async values => {
          try {
            if (DEBUG) {
              await AdsConsent.setDebugGeography(
                AdsConsentDebugGeography.NOT_EEA,
              );
            }

            const consent = values[0].status;
            const isEEA = values[0].isRequestLocationInEeaOrUnknown;

            const adProviders = values[1];

            if (adProviders && Array.isArray(adProviders)) {
              adProviders.sort((a, b) =>
                a.companyName.localeCompare(b.companyName),
              );
            }

            setAdsAll({
              adProviders,
              consent,
              isEEA,
            });

            if (isEEA && consent === AdsConsentStatus.UNKNOWN) {
              setShowConsent(true);
            }
          } catch (e) {
            console.log(e);
          }
        })
        .catch(err => console.log(err));
    }

    render() {
      const {noAds} = this.props;
      const {theme} = this.state;

      return (
        <ThemeContext.Provider value={this.state}>
          <PaperProvider
            theme={isDarkTheme(theme.name) ? darkTheme : lightTheme}>
            {!noAds && <AdConsent />}
            <App backgroundColor={theme.highlight} />
          </PaperProvider>
        </ThemeContext.Provider>
      );
    }
  },
);
