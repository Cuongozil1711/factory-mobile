import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import axiosConfig from '../../../../../../config/axiosConfig';
import {CODE_SUCCESS} from '../../../../../../config';
import {PROMOTION} from 'appNetworking';
import {setListPromotion} from './PromotionSlice';
import {Alert} from 'react-native';

export const getPromotionApi = () => async dispatch => {
  try {
    showLoading();
    let url = PROMOTION + '/search';
    ////console.log(url);
    axiosConfig
      .requestData('POST', url)
      .then(response => {
        if (response?.status === CODE_SUCCESS) {
          hideLoading();
          dispatch(setListPromotion(response?.data?.content));
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
