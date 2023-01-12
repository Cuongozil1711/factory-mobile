import {setCustomer, setOrder} from './orderShopSlice';
import {GET_ORDER, GET_CUSTOMER, GET_ORDER_DETAILS} from 'appNetworking';
import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {Alert} from 'react-native';

export const getOrderApi = (payload, param) => async dispatch => {
  try {
    showLoading();
    let url = GET_ORDER;
    if (payload != null) {
      url = url + payload;
    }
    ////console.log(url);
    axiosConfig
      .requestData('POST', url, {search: param})
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setOrder(response?.data?.content));
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
        // ////console.log(ex);
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

export const getCustomerAPI = payload => async dispatch => {
  try {
    showLoading();
    let url = GET_CUSTOMER;
    if (payload != null) {
      url = url + payload;
    }
    ////console.log(url);
    axiosConfig
      .requestData('POST', url)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setCustomer(response.data));
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
        // ////console.log(ex);
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

export const getDetailsOrder = (payload, callBack) => async dispatch => {
  ////console.log(payload);
  showLoading();
  axiosConfig
    .requestData('GET', GET_ORDER_DETAILS + '/' + payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data));
        }
      } else {
        ////console.log('error');
        hideLoading();
        dispatch(callBack(null));
        // Alert.alert('Thông báo', 'Có lỗi xảy ra', [
        //   {
        //     text: 'Ok',
        //     onPress: () => {},
        //   },
        // ]);
      }
    })
    .catch(ex => {
      ////console.log(ex);
      //dispatch(callBack(null));
      hideLoading();
    });
};
