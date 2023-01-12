import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {setDebit} from './DebitSlice';
import {Alert} from 'react-native';
export const getBillAPI = () => async dispatch => {
  try {
    showLoading();
    let url = '/bill/search';
    ////console.log(url);
    axiosConfig
      .requestData('GET', url)
      .then(response => {
        //console.log(response);
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setDebit(response?.data));
        } else {
          ////console.log('error');
          hideLoading();
          Alert.alert('Thông báo', 'Có lỗi xảy ra', [
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
        // Alert.alert('Thông báo', 'Có lỗi xảy ra', [
        //   {
        //     text: 'Ok',
        //     onPress: () => {},
        //   },
        // ]);
      });
  } catch (err) {
    throw new Error(err);
  }
};

export const updateBillAPI = (payload, onCallBack) => async dispatch => {
  try {
    showLoading();
    let url = '/bill/update/' + payload;
    ////console.log(url);
    axiosConfig
      .requestData('GET', url)
      .then(response => {
        //console.log(response);
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(onCallBack());
        } else {
          ////console.log('error');
          hideLoading();
          Alert.alert('Thông báo', 'Có lỗi xảy ra 1', [
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
        // Alert.alert('Thông báo', 'Có lỗi xảy ra 2', [
        //   {
        //     text: 'Ok',
        //     onPress: () => {},
        //   },
        // ]);
      });
  } catch (err) {
    throw new Error(err);
  }
};
