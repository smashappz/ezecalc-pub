import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import {Linking} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Snackbar from 'react-native-snackbar';
import Tts from 'react-native-tts';
import {APP_NAME} from './constants';
import {getTagKeyFromValue} from './pickers';

export const anal = (msg: string): void => {
  try {
    analytics().logEvent(`${APP_NAME}_${msg}`);
  } catch (e) {
    console.log(e);
  }
};

export const analButton = (key: string | undefined, decSep: string) => {
  let btn = key;
  let tag;

  switch (key) {
    case '×':
      btn = 'times';
      break;

    case '+':
      btn = 'plus';
      break;

    case '−':
      btn = 'minus';
      break;

    case '÷':
      btn = 'divide';
      break;

    case '%':
      btn = 'percent';
      break;

    case '( )':
      btn = 'brackets';
      break;

    case '=':
      btn = 'equals';
      break;

    case '▼':
      btn = 'next_option';
      break;

    case decSep:
      btn = 'point';
      break;

    case '←':
    case 'backspace-outline':
      btn = 'backspace';
      break;

    case 'mc':
      btn = 'mclr';
      break;

    case 'm+':
      btn = 'mplus';
      break;

    case 'm-':
      btn = 'mmin';
      break;

    case 'mr':
      btn = 'mrec';
      break;

    case '±':
      btn = 'bonus_negate';
      break;

    case '𝑥²':
      btn = 'bonus_squared';
      break;

    case '√𝑥':
      btn = 'bonus_square_root';
      break;

    case '1/𝑥':
      btn = 'bonus_reciprocal';
      break;

    case '𝑥³':
      btn = 'bonus_cubed';
      break;

    case '3√𝑥':
      btn = 'bonus_cube_root';
      break;

    case '𝑥^y':
      btn = 'bonus_power';
      break;

    case '𝑒^𝑥':
      btn = 'bonus_e_power';
      break;

    case 'sin':
      btn = 'bonus_sin';
      break;

    case 'cos':
      btn = 'bonus_cos';
      break;

    case 'tan':
      btn = 'bonus_tan';
      break;

    case 'log':
      btn = 'bonus_log';
      break;

    case 'ln':
      btn = 'bonus_ln';
      break;

    case 'log2':
      btn = 'bonus_log2';
      break;

    case 'rnd':
      btn = 'bonus_rnd';
      break;

    case 'π':
      btn = 'bonus_pi';
      break;

    case '𝑒':
      btn = 'bonus_e';
      break;

    case 'ϕ':
      btn = 'bonus_golden';
      break;

    case '√½':
      btn = 'bonus_sqrt_1/2';
      break;

    case '√2':
      btn = 'bonus_sqrt_2';
      break;

    default:
      tag = getTagKeyFromValue(key);

      if (tag) {
        btn = tag;
      }
  }

  anal(`calc_onPress_${btn}`);
};

export function browser(url: string): void {
  Linking.openURL(url);
}

export const formatOutput = (
  input: string | number,
  decSep: string,
  thouSep: string,
): string => {
  const parts = input.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thouSep);

  return parts.join(decSep);
};

export const getData = async (key: string): Promise<string | null> => {
  try {
    return AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export const getFont = (bold = false): string => {
  const font = (name: string) => `${name}_${bold ? 'Bold' : 'Regular'}`;

  return font('Lato');
};

export const setData = async (key: string, value: string): Promise<void> => {
  try {
    AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const showSnackbar = (text: string, duration = 1000): NodeJS.Timeout =>
  setTimeout(() => {
    Snackbar.show({
      duration: Snackbar.LENGTH_SHORT,
      text,
    });
  }, duration);

export async function speak(words: string): Promise<void> {
  if (!words) {
    return;
  }

  try {
    Tts.speak(words);
  } catch (e) {
    console.log(e);
  }
}

export const toHindi = (input: string) =>
  input
    .replace(/0/g, '०')
    .replace(/1/g, '१')
    .replace(/2/g, '२')
    .replace(/3/g, '३')
    .replace(/4/g, '४')
    .replace(/5/g, '५')
    .replace(/6/g, '६')
    .replace(/7/g, '७')
    .replace(/8/g, '८')
    .replace(/9/g, '९');
