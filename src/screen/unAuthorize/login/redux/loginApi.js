import {API_LOGIN} from 'appNetworking';
import {setDvtCode, setToken} from './appReducers';
import axiosConfig from '../../../../config/axiosConfig';
import {CODE_SUCCESS, dvt} from '../../../../config';
import {hideLoading, showLoading} from '../../../../until/dialogHolder';
import {clear, saveString} from '../../../../until/storage';
import {Alert} from 'react-native';

export const loginApi = payload => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('POST', API_LOGIN, payload)
    .then(response => {
      console.log(response.data?.role.split('_')[1]);
      if (response?.status === CODE_SUCCESS) {
        hideLoading();
        saveString('uid', response.data?.uid);
        saveString('role', response.data?.role.split('_')[1]);
        saveString('cid', response.data?.companyId.toString());
        saveString('token', response.data?.accessToken).then(res => {
          if (res) {
            dispatch(setToken(response.data));
          }
        });
        saveString('uid', response.data?.uid);
      } else {
        ////console.log('error');
        hideLoading();
        Alert.alert('Thông báo', 'Sai thông tin đăng nhập', [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]);
      }
    })
    .catch(ex => {
      ////console.log(ex);
      hideLoading();
      Alert.alert('Thông báo', 'Sai thông tin đăng nhập', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    });
};

export const dvtCodeApi = payload => async dispatch => {
  axiosConfig
    .requestData('GET', '/dvtCode/getAll', payload)
    .then(response => {
      console.log(response.data);
      if (response?.status === CODE_SUCCESS) {
        dispatch(setDvtCode(response.data ?? dvt));
      } else {
        console.log('error');
      }
    })
    .catch(ex => {
      console.log('error');
      hideLoading();
    });
};
