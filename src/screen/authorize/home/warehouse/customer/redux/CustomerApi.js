import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {CUSTOMER, GET_ORDER_CUSTOMER} from 'appNetworking';
import {setListCustomer, setOrderEmpId} from './CustomerSlice';
import {Alert} from 'react-native';

export const getCustomerAPI = () => async dispatch => {
  try {
    showLoading();
    let url = CUSTOMER + '/search';
    ////console.log(url);
    axiosConfig
      .requestData('POST', url)
      .then(response => {
        //console.log(response);
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setListCustomer(response?.data?.content));
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

export const getListOrderByCustomer = payload => async dispatch => {
  ////console.log('Payload: ' + JSON.stringify(payload));
  showLoading();
  axiosConfig
    .requestData('GET', GET_ORDER_CUSTOMER + '/' + payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        dispatch(setOrderEmpId(response?.data));
        hideLoading();
      } else {
        //console.log('error');
        hideLoading();
        // Alert.alert('Thông báo', 'Có lỗi xảy ra', [
        //   {
        //     text: 'Ok',
        //     onPress: () => {},
        //   },
        // ]);
      }
    })
    .catch(ex => {
      //console.log(ex);
      hideLoading();
      Alert.alert('Thông báo', 'Có lỗi xảy ra', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    });
};
