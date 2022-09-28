import RNFS, {
  DocumentDirectoryPath,
  ExternalStorageDirectoryPath,
} from 'react-native-fs';
import {APP_NAME} from './constants';

export let DB_NAME = APP_NAME + '.db';

export const getDB = (): string => {
  return `${getDBPath()}${DB_NAME}`;
};

export const getDBPath = (): string => {
  return `${DocumentDirectoryPath.slice(
    0,
    DocumentDirectoryPath.lastIndexOf('/'),
  )}/`;
};

export const getDocumentPath = (): string => {
  return `${ExternalStorageDirectoryPath}/Documents/`;
};

export async function init(): Promise<void> {
  try {
    RNFS.exists(getDBPath() + 'watermelon.db')
      .then(exists => {
        if (exists) {
          DB_NAME = 'watermelon.db';
        }
      })
      .catch(e => {
        console.error(e);
      });
  } catch (e) {
    console.error(e);
  }
}
