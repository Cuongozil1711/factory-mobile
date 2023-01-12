import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {
  GET_STATISTICAL,
  GET_COUNT_ORDER,
  GET_LIST_TOP_ORDER,
  GET_DETAIL_EXPORT_WARE_HOUSE,
} from 'appNetworking';
import {setCount, setData, setExportAll, setListItem} from './homeShopSlice';
import {Alert} from 'react-native';
export const getStatistial = () => async dispatch => {
  try {
    showLoading();
    axiosConfig
      .requestData('GET', GET_STATISTICAL)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setData(response?.data));
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
    ////console.log(err);
  }
};

export const getStatistialList = onCaulator => async dispatch => {
  try {
    showLoading();
    axiosConfig
      .requestData(
        'POST',
        GET_DETAIL_EXPORT_WARE_HOUSE + '/list-export/1?page=0&&size=999',
        {},
      )
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          console.log(response?.data?.length);
          dispatch(setExportAll(response?.data));
          dispatch(onCaulator(response?.data?.content));
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
        hideLoading();
      });
  } catch (err) {}
};

export const getCountOrder = () => async dispatch => {
  try {
    showLoading();
    axiosConfig
      .requestData('GET', GET_COUNT_ORDER)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setCount(response?.data));
        } else {
          ////console.log('error');
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
        ////console.log(ex);
        hideLoading();
        // Alert.alert('Thông báo', 'Có lỗi xảy ra 6', [
        //   {
        //     text: 'Ok',
        //     onPress: () => {},
        //   },
        // ]);
      });
  } catch (err) {
    ////console.log(err);
  }
};

export const getListOrder = () => async dispatch => {
  try {
    showLoading();
    axiosConfig
      .requestData('GET', GET_LIST_TOP_ORDER)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setListItem(response?.data));
        } else {
          ////console.log('error');
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
        ////console.log(ex);
        hideLoading();
        // Alert.alert('Thông báo', 'Có lỗi xảy ra 8', [
        //   {
        //     text: 'Ok',
        //     onPress: () => {},
        //   },
        // ]);
      });
  } catch (err) {
    ////console.log(err);
  }
};
