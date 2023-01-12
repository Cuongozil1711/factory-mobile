import {
  GET_ITEM,
  GET_STALLS,
  GET_PUBLISHER,
  GET_CATEGORY,
  GET_DETAILS_ITEM,
  GET_DETAILS_ITEM_SCANNER,
  UPDATE_PRICE_ITEM,
  GET_ITEM_CUSTOMER,
} from 'appNetworking';
import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {
  setCategory,
  setItem,
  setItemByCustomer,
  setPublisher,
  setStalls,
} from './itemReducers';
import RNBeep from 'react-native-a-beep';
import {Alert} from 'react-native';

export const getItemApi = payload => async dispatch => {
  showLoading();
  let url = GET_ITEM;
  if (payload != null) {
    url = url + payload;
  }
  axiosConfig
    .requestData('POST', url)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        hideLoading();
        // ////console.log('Response: ' + JSON.stringify(response.data));
        dispatch(setItem(response.data));
      } else {
        ////console.log('error');
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
      ////console.log(ex);
      hideLoading();
    });
};

export const getStallApi = payload => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('POST', GET_STALLS)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        hideLoading();
        dispatch(setStalls(response.data));
      } else {
        ////console.log('error');
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
      ////console.log(ex);
      hideLoading();
      Alert.alert('Thông báo', 'Có lỗi xảy ra', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    });
};

export const getPulisherApi = payload => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('POST', GET_PUBLISHER)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        hideLoading();
        dispatch(setPublisher(response.data));
      } else {
        ////console.log('error');
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
      ////console.log(ex);
      hideLoading();
      Alert.alert('Thông báo', 'Có lỗi xảy ra', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    });
};

export const getCategoryApi = payload => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('POST', GET_CATEGORY)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        hideLoading();
        dispatch(setCategory(response.data));
      } else {
        ////console.log('error');
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
      ////console.log(ex);
      hideLoading();
      Alert.alert('Thông báo', 'Có lỗi xảy ra', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    });
};

export const getDetailsItem = (payload, callBack) => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('GET', GET_DETAILS_ITEM + '/' + payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data));
        }
      } else {
        ////console.log('error');
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
      ////console.log(ex);
      hideLoading();
      // Alert.alert('Thông báo', 'Có lỗi xảy ra', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);
    });
};

export const getDetailsItemScanner = (payload, callBack) => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('GET', GET_DETAILS_ITEM_SCANNER + '/' + payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data));
        }
      } else {
        ////console.log('error');
        dispatch(callBack(null));
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
      hideLoading();
      dispatch(callBack(null));
      // Alert.alert('Thông báo', ex, [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);
    });
};

export const updatePriceItem = (payload, callBack) => async dispatch => {
  ////console.log('Payload: ' + JSON.stringify(payload));
  showLoading();
  axiosConfig
    .requestData('PUT', UPDATE_PRICE_ITEM + '/' + payload?.id, {...payload})
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response));
        }
      } else {
        ////console.log('error');
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
      ////console.log(ex);
      hideLoading();
      // Alert.alert('Thông báo', 'Có lỗi xảy ra', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);
    });
};
