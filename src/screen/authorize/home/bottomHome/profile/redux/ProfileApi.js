import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {GET_BY_USER} from 'appNetworking';
import {setDistrict, setProvince, setUser, setWards} from './ProfileSlice';
import {Alert} from 'react-native';
export const getByUser = () => async dispatch => {
  try {
    showLoading();
    let url = GET_BY_USER;
    ////console.log(url);
    axiosConfig
      .requestData('GET', url)
      .then(response => {
        //console.log(response);
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setUser(response?.data));
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

export const getProvinceApi = () => async dispatch => {
  try {
    showLoading();
    let url = '/address/province';
    axiosConfig
      .requestData('GET', url)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setProvince(response?.data));
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
        //console.log(ex);
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

export const getDistrictApi = provinceId => async dispatch => {
  try {
    showLoading();
    let url = '/address/district/' + provinceId;
    axiosConfig
      .requestData('GET', url)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setDistrict(response?.data));
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
        //console.log(ex);
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

export const getWardsApi = districtId => async dispatch => {
  try {
    showLoading();
    let url = '/address/wards/' + districtId;
    axiosConfig
      .requestData('GET', url)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setWards(response?.data));
        } else {
          ////console.log('error');
          hideLoading();
        }
      })
      .catch(ex => {
        //console.log(ex);
        hideLoading();
      });
  } catch (err) {
    throw new Error(err);
  }
};

export const updateUserApi = (payload, callBack) => async dispatch => {
  try {
    showLoading();
    //console.log(callBack);
    let url = '/user/update/';
    axiosConfig
      .requestData('POST', url, payload)
      .then(response => {
        console.log(response?.status);
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          callBack(response?.data);
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
        //console.log(ex);
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
