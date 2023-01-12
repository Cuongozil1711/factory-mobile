import {GET_WARE_HOUSE, GET_ITEM, ADDRESS} from 'appNetworking';
import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {setAddress, setItem, setWareHouse} from './ManagerSlice';
import {Alert} from 'react-native';
export const getWareHouseApi = () => async dispatch => {
  try {
    showLoading();
    let url = GET_WARE_HOUSE;
    ////console.log(url);
    axiosConfig
      .requestData('POST', url)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          //console.log(response);
          dispatch(setWareHouse(response?.data?.content));
        } else {
          //console.log('error');
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

export const getItemApi = () => async dispatch => {
  showLoading();
  let url = GET_ITEM;
  axiosConfig
    .requestData('POST', url)
    .then(response => {
      if (response?.status === CODE_SUCCESS) {
        hideLoading();
        console.log('Response: ' + JSON.stringify(response.data));
        dispatch(setItem(response.data));
      } else {
        // Alert.alert('Thông báo', 'Có lỗi xảy ra', [
        //   {
        //     text: 'Ok',
        //     onPress: () => {},
        //   },
        // ]);
        hideLoading();
      }
    })
    .catch(ex => {
      // Alert.alert('Thông báo', 'Có lỗi xảy ra', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);
      hideLoading();
    });
};
