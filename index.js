import {AppRegistry, LogBox} from 'react-native';
import {App} from './app';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  'AdMob',
  'Admob',
  'Cannot update',
  'Expected style',
  'GDrive',
  'Immutable',
  'has a method',
  'new NativeEventEmitter',
  'Offerings',
  'Possible',
  'Remote',
  'Serializable',
  'TTS',
  'Touch',
  'ViewPager',
  'VirtualizedLists',
  'Warning',
]);

AppRegistry.registerComponent(appName, () => App);
