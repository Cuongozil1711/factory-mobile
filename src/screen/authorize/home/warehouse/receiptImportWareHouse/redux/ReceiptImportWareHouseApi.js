import {
  GET_RECEIPT_IMPORT_WARE_HOUSE,
  RECEIPT_IMPORT_WARE_HOUSE,
} from 'appNetworking';
import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {setListReceiptImportWareHouse} from './ReceiptImportWareHouseSlice';
import {Alert} from 'react-native';
export const getReceiptImportWareHouseApi = () => async dispatch => {
  try {
    showLoading();
    let url = GET_RECEIPT_IMPORT_WARE_HOUSE;
    axiosConfig
      .requestData('POST', url)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setListReceiptImportWareHouse(response?.data?.content));
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

export const createReceiptImportWareHouseApi =
  (payload, callBack) => async dispatch => {
    try {
      showLoading();
      let url = RECEIPT_IMPORT_WARE_HOUSE;
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

export const deleteReceiptImportWareHouseApi =
  (payload, callBack) => async dispatch => {
    try {
      showLoading();
      let url = RECEIPT_IMPORT_WARE_HOUSE + '/delete/' + payload;
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
