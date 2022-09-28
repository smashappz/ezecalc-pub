import {GoogleSignin} from '@react-native-community/google-signin';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import * as Sentry from '@sentry/react-native';
import Purchases from 'react-native-purchases';
import Tts from 'react-native-tts';
import {OFFERINGS} from './helpers/constants';
import {init as filesInit} from './helpers/files';

export async function init(): Promise<void> {
  try {
    Sentry.init({
      dsn: '',
    });
  } catch (e) {
    console.error('Sentry ' + JSON.stringify(e));
  }

  filesInit();

  try {
    Tts.setDucking(true);
  } catch (e) {
    console.error('TTS error ' + JSON.stringify(e));
  }

  try {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.MA,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: false,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: false,
      })
      .then(() => {
        // Request config successfully set!
      });
  } catch (e) {
    console.error('Admob ' + JSON.stringify(e));
  }

  try {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        '',
    });

    GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  } catch (e) {
    console.error('Signin ' + JSON.stringify(e));
  }

  try {
    Purchases.setDebugLogsEnabled(true);

    Purchases.setup('');
  } catch (e) {
    console.error('Purchases ' + JSON.stringify(e));
  }

  try {
    const offerings = await Purchases.getOfferings();

    if (offerings.current?.availablePackages.length !== 0) {
      const {all, current} = offerings;

      OFFERINGS.all = all;
      OFFERINGS.current = current;
    }
  } catch (e) {
    console.error('Offerings ' + JSON.stringify(e));
  }
}
