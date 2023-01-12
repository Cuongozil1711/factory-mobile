import {Dimensions, Platform, StatusBar} from 'react-native';

const STATUSBAR_DEFAULT_HEIGHT = 0;

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;

const getStatusBarHeight = skipAndroid => {
  return Platform.select({
    ios: statusBarHeight,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  });
};

class Device {
  static DEVICE_WIDTH = W_WIDTH;
  static DEVICE_HEIGHT = W_HEIGHT;
  static HEADER_HEIGHT = 50;
  static STATUS_HEIGHT = getStatusBarHeight(true);
  static HEADER_STATUS_HEIGHT = this.STATUS_HEIGHT + this.HEADER_HEIGHT;
}

export default Device;
