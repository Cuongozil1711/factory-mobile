import React, {useEffect, useCallback, useState} from 'react';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BarcodeMask} from '@nartc/react-native-barcode-mask';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {
  hideLoading,
  showLoading,
} from '../../../../../../../until/dialogHolder';
import {translate} from '../../../../../../../common/i18n/translate';
import {Block} from '../../../../../../../library/components/Block/Block';
import {
  CameraTB,
  CustomText,
  Divider,
} from '../../../../../../../library/components';
import {APP_COLOR, getCode} from '../../../../../../../config';
import Header from '../../../../../../../components/Header';
import {getItem} from '../../../../bottomHome/manager/redux/ManagerSlice';
import {ItemScanner} from '../itemScanner/ItemScanner';
import {apiImportQuickLy, postImportApi} from '../../redux/ImportWareHouseApi';
import RNBeep from 'react-native-a-beep';
import {APP_SCREEN} from '../../../../../../../common/screenType';

export function ImportWareHouseQrCodeQuickLy({navigation, route}) {
  const [importListDataWareHouseDto, setImportListDataWareHouseDto] =
    React.useState({
      ...route?.params,
      dataItem: [],
    });

  const refScanner = React.createRef();
  const openModal = checkItem => {
    refScanner.current.openModal(checkItem);
  };

  const listItem = useSelector(getItem);
  const [viewDetail, setViewDetail] = useState(false);
  const [details, setDetails] = React.useState();
  const [qrCode, setQrCode] = React.useState();
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
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    Alert.alert('Xin chào thủ kho', 'Bạn có muốn chắc chắn hủy nhập kho', [
      {
        text: 'Hủy',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Đồng ý', onPress: () => navigation.goBack()},
    ]);
    return true;
  };

  const onSave = data => {
    let listData = importListDataWareHouseDto.dataItem ?? [];
    listData.push({
      numberBox: data?.numberBox,
      quantity: data?.quality,
      totalPrice: data?.totalPrice,
      id: data?.id,
      idItems: data?.idItems,
      dateExpired: new Date(data?.dateExpired),
    });
    setImportListDataWareHouseDto({
      ...importListDataWareHouseDto,
      data: listData,
    });
    setViewDetail(false);
  };

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
  const onSuccess = data => {
    if (data) {
      navigation.goBack();
    } else {
      Alert.alert('Xin chào thủ kho', 'Đã có lỗi xảy ra', [
        {
          text: 'Đồng ý',
          onPress: () => {
            hideLoading();
            _enableReader();
          },
        },
      ]);
    }
  };

  const onSubmit = () => {
    //console.log(importListDataWareHouseDto.dataItem);
    if (importListDataWareHouseDto.dataItem.length > 0) {
      const payload = {
        code: getCode('IN'),
        idReceiptImport: importListDataWareHouseDto?.idReceiptImport,
        data: importListDataWareHouseDto.dataItem,
      };
      //console.log(payload);
      dispatch(postImportApi(payload, onSuccess));
    }
  };

  const onSuccessQrCode = res => {
    console.log('res: ' + res);
    RNBeep.PlaySysSound(RNBeep.AndroidSoundIDs.TONE_PROP_BEEP);
    showModal(true);
    setTimeout(() => {
      showModal(false);
      _enableReader();
    }, 800);
    if (res) {
      hideLoading();
      navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.MAIN);
    } else {
      hideLoading();
      setQrCode(false);
      Alert.alert('Thông báo', 'Phiếu nhập kho không tồn tại', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    }
  };

  const onGetDataSucceeded = response => {
    try {
      console.log('response: ' + response);
      if (response) {
        setEnableReader(false);
        setQrCode(response);
        dispatch(apiImportQuickLy(response, onSuccessQrCode));
      }
    } catch (ex) {
      navigation.goBack();
    }
  };

  /**
   * Submit barcode
   */
  const onBarCodeDetected = val => {
    showLoading(translate('dialog:loading'));
    const data = val?.data;
    onGetDataSucceeded(data);
  };

  return (
    <Block block>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={navigation}
        title={translate('ctp:importWareHouse:title')}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: APP_COLOR,
        }}>
        <View style={[styles.wrapHeader]}>
          <CustomText style={{color: '#FFF'}}>Scan để nhập kho ngay</CustomText>
        </View>
        <Divider backgroundColor="#FFF" />
        {!IsFocused ? (
          <ItemScanner
            listItem={listItem}
            data={details}
            onClose={() => setViewDetail(false)}
            onSave={data => onSave(data)}
          />
        ) : (
          <CameraTB onBarCodeDetected={enableReader ? onBarCodeDetected : null}>
            <BarcodeMask
              showAnimatedLine={true}
              height={100}
              backgroundColor="black"
              maskOpacity={0.2}
              edgeRadius={5}
            />
            {isShowModal ? (
              <Block block middle justifyContent={'center'}>
                <Icon
                  size={50}
                  as={FontAwesome}
                  color="#4CAD57FF"
                  name="check-circle"
                />
              </Block>
            ) : null}
          </CameraTB>
        )}
      </View>
    </Block>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  onTop: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: APP_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
  },
  arrow: {
    fontSize: 48,
  },
  viewSpace: {
    paddingVertical: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divide: {
    width: '100%',
    height: StyleSheet.hairlineWidth * 2,
    opacity: 0.8,
    backgroundColor: 'gray',
  },
  root: {
    flex: 1,
  },
  wrapHeader: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
  wrapHeader1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
  },
  fullParent: {
    flex: 1,
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 14,
    paddingHorizontal: 2,
    marginHorizontal: 2,
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 5,
    marginTop: 25,
  },
});
