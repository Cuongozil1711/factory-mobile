import React, {useEffect, useCallback, useState} from 'react';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BarcodeMask} from '@nartc/react-native-barcode-mask';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button, Icon, Text} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {
  hideLoading,
  showLoading,
} from '../../../../../../../until/dialogHolder';
import {translate} from '../../../../../../../common/i18n/translate';
import {Block} from '../../../../../../../library/components/Block/Block';
import {CameraTB, CustomText} from '../../../../../../../library/components';
import {APP_COLOR, getCode} from '../../../../../../../config';
import Header from '../../../../../../../components/Header';
import {getItem} from '../../../../bottomHome/manager/redux/ManagerSlice';
import {ItemScanner} from '../itemScanner/ItemScanner';
import RNBeep from 'react-native-a-beep';
import {getDetailsExport, postExportApi} from '../../redux/ExportWareHouseApi';

export function ExportWareHouseQrCode({navigation, route}) {
  const [exportListDataWareHouseDto, setexportListDataWareHouseDto] =
    React.useState({
      ...route?.params,
      dataItem: [],
    });

  const refScanner = React.createRef();
  const openModal = checkItem => {
    refScanner.current.openModal(checkItem);
  };

  const listItem = useSelector(getItem);
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
    Alert.alert('Xin chào thủ kho', 'Bạn có muốn chắc chắn hủy xuất kho', [
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
    let listData = exportListDataWareHouseDto.dataItem ?? [];
    listData.push({
      quality: data?.quality,
      idItems: data?.id,
      idImportWareHouse: data?.idImportWareHouse,
      dvtCode: data?.dvtCode,
      priceItem: data.priceItem,
      totalPrice: data?.totalPrice,
    });
    setexportListDataWareHouseDto({
      ...exportListDataWareHouseDto,
      data: listData,
    });
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
      showModal(true);
      hideLoading();
      setTimeout(() => {
        showModal(false);
        _enableReader();
      }, 800);
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
    if (exportListDataWareHouseDto.dataItem.length > 0) {
      const payload = {
        code: getCode('EX'),
        idReceiptExport: exportListDataWareHouseDto?.idReceiptExport,
        data: exportListDataWareHouseDto.dataItem,
      };
      //console.log('payload: ' + JSON.stringify(payload));
      dispatch(postExportApi(payload, onSuccess));
    }
  };

  const onGetDataSucceeded = response => {
    // dispatch(getDetailsItemScanner(response, onSucessGetITem));
    try {
      if (response) {
        hideLoading();
        dispatch(
          getDetailsExport(response, res => {
            if (res) {
              RNBeep.PlaySysSound(RNBeep.AndroidSoundIDs.TONE_PROP_BEEP);
              openModal({
                ...res,
                idImportWareHouse: response,
                idReceiptExport: exportListDataWareHouseDto?.idReceiptExport,
              });
            } else {
              Alert.alert('Xin chào thủ kho', 'Sản phẩm không tìm thấy', [
                {
                  text: 'Đồng ý',
                  onPress: () => null,
                  style: 'cancel',
                },
              ]);
            }
          }),
        );
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
        title={translate('ctp:exportWareHouse:title')}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: APP_COLOR,
        }}>
        <View style={[styles.wrapHeader]}>
          <CustomText style={{color: '#FFF'}}>
            {exportListDataWareHouseDto?.name}
          </CustomText>
          <CustomText style={{color: '#FFF'}}>
            Số lượng: {exportListDataWareHouseDto?.dataItem.length}
          </CustomText>
        </View>
        {!IsFocused ? null : (
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
                  size={25}
                  as={FontAwesome}
                  color={APP_COLOR}
                  name="check-circle"
                />
              </Block>
            ) : null}
          </CameraTB>
        )}
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 60,
            paddingVertical: 20,
            backgroundColor: '#FFFF',
            justifyContent: 'space-between',
          }}>
          <Button
            style={{backgroundColor: APP_COLOR}}
            onPress={() => onSubmit()}>
            Xuất kho
          </Button>
          <Button
            style={{backgroundColor: APP_COLOR}}
            onPress={() => backAction()}>
            Hủy
          </Button>
        </View>

        <ItemScanner ref={refScanner} onSave={data => onSave(data)} />
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
