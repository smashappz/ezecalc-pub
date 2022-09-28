// @ts-ignore
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

export const signIn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await GoogleSignin.signInSilently();
      resolve(user.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        try {
          const user = await GoogleSignin.signIn();
          resolve(user.user);
        } catch (e) {
          resolve(undefined);
        }
      } else {
        resolve(undefined);
      }
    }
  });
};

export const signOut = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      resolve(true);
    } catch (e) {
      resolve(false);
    }
  });
};
