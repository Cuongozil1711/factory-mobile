import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useRef,
  createRef,
} from 'react';
import {Alert, BackHandler, View} from 'react-native';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {BarcodeMask} from '@nartc/react-native-barcode-mask';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import RNBeep from 'react-native-a-beep';
import {CameraQrCode} from '../../../../../../library/components';
import {hideLoading, showLoading} from '../../../../../../until/dialogHolder';
import {translate} from '../../../../../../common/i18n/translate';
import Header from '../../../../../../components/Header';
import {Block} from '../../../../../../library/components/Block/Block';
import {APP_SCREEN} from '../../../../../../common/screenType';
import {getDetailsOrder} from '../redux/orderShopApi';
export function OrderDetail({navigation}) {
  /**
   * Kiểm tra màn hình có đang được focus
   */
  const IsFocused = useIsFocused();
  const dispatch = useDispatch();
  /**
   * Cờ chặn camera đọc barcode
   */
  const [enableReader, setEnableReader] = useState(true);

  useEffect(() => {
    // ////console.log('camera state: ', IsFocused);
    if (!IsFocused) {
      // Torch.switchState(true);
      _enableReader();
    }
    // else Torch.switchState(false);
  });

  // useEffect(dispatch(onTurnOffCameraState(false)), [route]);

  /**
   * Cờ chặn camera đọc barcode
   */
  const [isShowModal, showModal] = useState(false);

  const backAction = () => {
    // dispatch(onTurnOffCameraState(false));
    ////console.log(57);
    // navigate(APP_SCREEN.AUTHORIZE.HOME);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  useEffect(() => {
    return () => backHandler.remove();
  });

  /**
   * Bật cờ cho phép detect QR
   */
  const _enableReader = useCallback(() => {
    setTimeout(() => {
      showModal(false);
      setEnableReader(true);
    }, 800);
  }, []);

  /**
   * On success => submit to server
   * @param params
   */
  const onSuccess = params => {
    const {success} = params;
    if (success) {
      showModal(true);
      hideLoading();
      setTimeout(() => {
        showModal(false);
        _enableReader();
      }, 800);
    } else {
      Alert.alert(
        translate('dialog:error'),
        translate(params?.msg ?? 'error:400'),
        [
          {
            text: translate('dialog:yes'),
            onPress: () => {
              hideLoading();
              _enableReader();
            },
          },
        ],
      );
    }
  };

  const onSucessGetITem = response => {
    if (response) {
      hideLoading();
      navigation.navigate(APP_SCREEN.HOME.FOOTER_BOTTOM.ORDER.ITEM_ORDER, {
        ...response,
      });
    } else {
      hideLoading();
      Alert.alert('Thông báo', 'Không tìm thấy đơn hàng náo', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    }
  };

  const onViewItem = idItems => {
    dispatch(getDetailsOrder(idItems, onSucessGetITem));
  };

  /**
   * Submit barcode
   */
  const onBarCodeDetected = val => {
    showLoading(translate('dialog:loading'));
    const data = val?.data;
    //console.log(data);
    onViewItem(data);
  };

  return (
    <Block block>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={navigation}
        title={translate('ctp:search')}
      />
      <View style={styles.container}>
        {!IsFocused ? null : (
          <CameraQrCode
            onBarCodeDetected={enableReader ? onBarCodeDetected : null}>
            <BarcodeMask
              showAnimatedLine={false}
              backgroundColor="black"
              maskOpacity={0.2}
              edgeRadius={5}
            />
            {isShowModal ? (
              <Block block middle justifyContent={'center'}>
                <Icon
                  size={25}
                  as={FontAwesome}
                  color={'#FFF'}
                  name="check-circle"
                />
              </Block>
            ) : null}
          </CameraQrCode>
        )}
      </View>
    </Block>
  );
}
