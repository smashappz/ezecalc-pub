import {PERMISSIONS, request} from 'react-native-permissions';
import {APP_NAME} from './constants';
import i18n from './i18n';

export const requestStorageAccess = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, {
        buttonPositive: i18n.t('dialog.btnOk'),
        message: i18n.t('config.requestStorageAccess_msg', {app: APP_NAME}),
        title: i18n.t('config.requestStorageAccess_title'),
      })
        .then((response: string) => {
          resolve(response === 'granted');
        })
        .catch(() => reject(false));
    } catch (e) {
      reject(false);
    }
  });
};
