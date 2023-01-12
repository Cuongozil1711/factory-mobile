import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {EMPLOYEE, GET_ORDER_EMPLOYEE} from 'appNetworking';
import {setListEmployee, setOrderEmpId} from './EmployeeSlice';
import {Alert} from 'react-native';
export const getEmployeeAPI = () => async dispatch => {
  try {
    showLoading();
    let url = EMPLOYEE + '/search';
    ////console.log(url);
    axiosConfig
      .requestData('POST', url)
      .then(response => {
        //console.log(response);
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setListEmployee(response?.data?.content));
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

export const getListOrderByEmployee = payload => async dispatch => {
  ////console.log('Payload: ' + JSON.stringify(payload));
  showLoading();
  axiosConfig
    .requestData('GET', GET_ORDER_EMPLOYEE + '/' + payload)
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
      // Alert.alert('Thông báo', 'Có lỗi xảy ra', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);
    });
};
