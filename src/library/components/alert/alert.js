import {Alert, BackHandler} from 'react-native';
import {exit} from './alertComponent';

export const alertExitApp = (params = exit) => {
  //("EXIT")
  Alert.alert(
    params.title,
    params.message,
    [
      {
        text: params.buttonTextReject,
        style: params.styleAlert,
      },
      {text: params.buttonTextAccept, onPress: () => BackHandler.exitApp()},
    ],
    {cancelable: false},
  );
  return true;
};

export const loggingError = params => {
  Alert.alert(params.title, params.message, [
    {
      text: params.buttonTextAccept,
      style: params.styleAlert,
    },
  ]);
  return true;
};

export const exitAppNoCancel = params => {
  Alert.alert(
    params.title,
    params.message,
    [{text: params.buttonTextAccept, onPress: () => BackHandler.exitApp()}],
    {cancelable: false},
  );
  return true;
};
