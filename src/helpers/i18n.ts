import i18n from 'i18n-js';
import {NativeModules} from 'react-native';
// @ts-ignore
import en from '../locales/en.json';
// @ts-ignore
import es from '../locales/es.json';
// @ts-ignore
import hi from '../locales/hi.json';
import LocaleCurrency from 'locale-currency';
import getSymbolFromCurrency from 'currency-symbol-map';

i18n.defaultLocale = 'en';
i18n.fallbacks = true;

export let currencySymbol = '';

try {
  const {localeIdentifier} = NativeModules.I18nManager;
  const currencyCode = LocaleCurrency.getCurrency(localeIdentifier);

  currencySymbol = getSymbolFromCurrency(currencyCode) || '';

  i18n.locale = NativeModules.I18nManager.localeIdentifier.split('_')[0];
} catch (e) {
  i18n.locale = 'en';
}

i18n.translations = {en, es, hi};

export const getLocale = (): string => i18n.locale;

export const isHindi = (): boolean => i18n.locale === 'hi';

export default i18n;
