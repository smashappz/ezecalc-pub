import {Dimensions} from 'react-native';
import {getApplicationName, getVersion} from 'react-native-device-info';
import {PurchasesOffering} from 'react-native-purchases';

export const AD_UNIT = '';

export const AD_UNIT_REW = ''; // rewarded

export const APP_NAME = 'ezecalc';

export const APP_NAME_VER = `${getApplicationName()} v${getVersion()}`;

export const DEBUG = false;

export const DETOX = false;

export const DEV_URL =
  '';

export const ENTITLEMENT_DISCOUNT = 'discount_calc';

export const ENTITLEMENT_NO_ADS = 'no_ads';

export type Offerings = {
  all: {
    [key: string]: PurchasesOffering;
  };
  current: PurchasesOffering | null;
};

export const OFFERINGS: Offerings = {all: {}, current: null};

export const OFFER_DISCOUNT = 'ezecalc_discount_calc';

export const OFFER_NO_ADS = 'ezecalc_no_ads';

export const PACKAGE_NAME = `com.smashappz.${APP_NAME}`;

export const PLAY_URL = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;

export const PUB_ID = '';

export const PURCHASED = false;

// Windowing

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

export const HEIGHT_RATIO = windowHeight / 592;
export const WIDTH_RATIO = windowWidth / 320;

export const MIN_HEIGHT = HEIGHT_RATIO > 1;
export const MIN_WIDTH = WIDTH_RATIO > 1;

