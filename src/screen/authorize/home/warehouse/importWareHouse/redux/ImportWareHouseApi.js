import {
  GET_IMPORT_WARE_HOUSE,
  GET_DETAIL_IMPORT_WARE_HOUSE,
  POST_IMPORT_WARE_HOUSE,
  API_CHECK_IMPORT,
  API_IMPORT_QUICKLY,
  UPLOAD_IMAGE,
} from 'appNetworking';
import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {setListImportWareHouse} from './ImportWareHouseSlice';
import {Alert} from 'react-native';
export const getImportWareHouseApi = () => async dispatch => {
  try {
    showLoading();
    let url = GET_IMPORT_WARE_HOUSE + '/2';
    ////console.log(url);
    axiosConfig
      .requestData('POST', url, {startDate: new Date(), endDate: new Date()})
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setListImportWareHouse(response?.data?.content));
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
      });
  } catch (err) {
    throw new Error(err);
  }
};

export const getDetailsImport = (payload, callBack) => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('GET', GET_DETAIL_IMPORT_WARE_HOUSE + '/' + payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data));
        }
      } else {
        //console.log('error');
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
      //console.log(ex);
      hideLoading();
      // Alert.alert('Thông báo', 'Có lỗi xảy ra 4', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);
    });
};

export const postImportApi = (payload, callBack) => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('POST', POST_IMPORT_WARE_HOUSE, payload)
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
    });
};

export const apiCheckImport = (payload, callBack) => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('POST', API_CHECK_IMPORT, payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data, payload));
        }
      } else {
        //console.log('error');
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
      //console.log(ex);
      hideLoading();
    });
};

export const apiImportQuickLy = (payload, callBack) => async dispatch => {
  showLoading();
  axiosConfig
    .requestData('PUT', API_IMPORT_QUICKLY + '/' + payload)
    .then(response => {
      console.log('response 111' + JSON.stringify(response));
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
      //console.log(ex);
      hideLoading();
    });
};

export const uploadImage = (id, payload, callBack) => async dispatch => {
  console.log(157, id);
  showLoading();
  axiosConfig
    .postImage('POST', UPLOAD_IMAGE + '/?type=import&&rootId=' + id, payload)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        if (typeof callBack === 'function') {
          dispatch(callBack(response?.data));
        }
      } else {
        //console.log('error');
        hideLoading();
        Alert.alert('Thông báo', 'Có lỗi xảy ra 11', [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]);
      }
    })
    .catch(ex => {
      Alert.alert('Thông báo', ex?.data, [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
      console.log(ex);
      hideLoading();
    });
};
