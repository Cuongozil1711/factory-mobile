import {
  GET_RECEIPT_EXPORT_WARE_HOUSE,
  RECEIPT_EXPORT_WARE_HOUSE,
  GET_WARE_HOUSE_ALL,
  COMPANY,
} from 'appNetworking';
import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {
  setCompany,
  setListReceiptExportWareHouse,
  setSupplier,
  setWareHouseTo,
} from './ReceiptExportWareHouseSlice';
import {Alert} from 'react-native';
import {SUPPLIER} from '../../../../../../library/networking';
export const getReceiptExportWareHouseApi = () => async dispatch => {
  try {
    showLoading();
    let url = GET_RECEIPT_EXPORT_WARE_HOUSE;
    axiosConfig
      .requestData('POST', url)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setListReceiptExportWareHouse(response?.data?.content));
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

// export const getDetailsImport = (payload, callBack) => async dispatch => {
//   showLoading();
//   axiosConfig
//     .requestData('GET', GET_DETAIL_IMPORT_WARE_HOUSE + '/' + payload)
//     .then(response => {
//       if (response?.status === CODE_SUCCESS) {
//         if (typeof callBack === 'function') {
//           dispatch(callBack(response?.data));
//         }
//       } else {
//         ////console.log('error');
//         hideLoading();
//       }
//     })
//     .catch(ex => {
//       ////console.log(ex);
//       hideLoading();
//     });
// };

export const deleteReceiptExportWareHouseApi =
  (payload, callBack) => async dispatch => {
    try {
      showLoading();
      let url = RECEIPT_EXPORT_WARE_HOUSE + '/delete/' + payload;
      axiosConfig
        .requestData('PUT', url, payload)
        .then(response => {
          if (response?.status === CODE_SUCCESS) {
            hideLoading();
            if (typeof callBack === 'function') {
              dispatch(callBack(response?.data));
            }
          } else {
            ////console.log('error');
            hideLoading();
          }
        })
        .catch(ex => {
          ////console.log(ex);
          hideLoading();
        });
    } catch (err) {
      throw new Error(err);
    }
  };

export const createReceiptExportWareHouseApi =
  (payload, callBack) => async dispatch => {
    try {
      showLoading();
      let url = RECEIPT_EXPORT_WARE_HOUSE;
      axiosConfig
        .requestData('POST', url, payload)
        .then(response => {
          if (response?.status === CODE_SUCCESS) {
            hideLoading();
            if (typeof callBack === 'function') {
              dispatch(callBack(response?.data));
            }
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
        });
    } catch (err) {
      throw new Error(err);
    }
  };

export const getCompany = () => async dispatch => {
  try {
    showLoading();
    let url = COMPANY;
    axiosConfig
      .requestData('POST', url, {})
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setCompany(response?.data?.content));
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

export const getWareHouseTo = () => async dispatch => {
  try {
    showLoading();
    let url = GET_WARE_HOUSE_ALL;
    axiosConfig
      .requestData('POST', url, {})
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setWareHouseTo(response?.data?.content));
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

export const getSupplier = () => async dispatch => {
  try {
    showLoading();
    let url = SUPPLIER;
    axiosConfig
      .requestData('POST', url, {})
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setSupplier(response?.data?.content));
        } else {
          ////console.log('error');
          hideLoading();
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
