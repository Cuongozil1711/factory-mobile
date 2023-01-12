import {
  GET_EXPORT_WARE_HOUSE,
  IMPORT_WARE_HOUSE,
  POST_EXPORT_WARE_HOUSE,
  GET_DETAIL_EXPORT_WARE_HOUSE,
} from 'appNetworking';
import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {setListExportWareHouse} from './ExportWareHouseSlice';
import {Alert} from 'react-native';
export const getExportWareHouseApi = () => async dispatch => {
  try {
    showLoading();
    let url = GET_EXPORT_WARE_HOUSE + '/1';
    ////console.log(url);
    axiosConfig
      .requestData('GET', url)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          //console.log(response);
          dispatch(setListExportWareHouse(response?.data?.content));
        } else {
          //console.log('error');
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
        //console.log(ex);
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

export const getDetailsExport = (payload, callBack) => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('GET', IMPORT_WARE_HOUSE + '/' + payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data));
        }
      } else {
        ////console.log('error');
        hideLoading();
        Alert.alert('Thông báo', 'Có lỗi xảy ra 3', [
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
      // Alert.alert('Thông báo', 'Có lỗi xảy ra 4', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);
    });
};

export const postExportApi = (payload, callBack) => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('POST', POST_EXPORT_WARE_HOUSE, payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data));
        }
      } else {
        //console.log('error');
        hideLoading();
        Alert.alert('Thông báo', 'Có lỗi xảy ra 5', [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]);
      }
    })
    .catch(ex => {
      //console.log(ex);
      hideLoading();
      // Alert.alert('Thông báo', 'Có lỗi xảy ra 6', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);
    });
};

export const getDetailsExportById = (payload, callBack) => async dispatch => {
  showLoading();
  //console.log(payload);
  axiosConfig
    .requestData('GET', GET_DETAIL_EXPORT_WARE_HOUSE + '/' + payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data));
        }
      } else {
        console.log('error');
        hideLoading();
        Alert.alert('Thông báo', 'Có lỗi xảy ra 7', [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]);
      }
    })
    .catch(ex => {
      console.log(ex);
      hideLoading();
    });
};

export const getDetailsExportByCode = (payload, callBack) => async dispatch => {
  showLoading();
  //console.log(payload);
  axiosConfig
    .requestData('GET', GET_DETAIL_EXPORT_WARE_HOUSE + '/ocr/' + payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data));
        }
      } else {
        //console.log('error');
        hideLoading();
        Alert.alert('Thông báo', 'Có lỗi xảy ra 9', [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]);
      }
    })
    .catch(ex => {
      // //console.log(ex);
      hideLoading();
      // Alert.alert('Thông báo', 'Có lỗi xảy ra 10', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);
    });
};
