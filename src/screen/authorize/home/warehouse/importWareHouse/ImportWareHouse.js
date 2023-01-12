import * as React from 'react';
import {Icon, Text, View} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useRef, useState} from 'react';
import {APP_SCREEN} from '../../../../../common/screenType';
import {Divider, ModalReceipt} from '../../../../../library/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../../../../components/Header';
import {translate} from '../../../../../common/i18n/translate';
import {getListImportWareHouse} from './redux/ImportWareHouseSlice';
import {
  getDetailsImport,
  getImportWareHouseApi,
} from './redux/ImportWareHouseApi';
import {ListView} from './component';
import {getItemApi} from '../../bottomHome/item/redux/itemApi';
import {useIsFocused} from '@react-navigation/native';
import {getReceiptImportWareHouseApi} from '../receiptImportWareHouse/redux/ReceiptImportWareHouseApi';
import {APP_COLOR} from '../../../../../config';
import {getRole} from '../../../../unAuthorize/login/redux/appReducers';
export function ImportWareHouse(props) {
  const dispatch = useDispatch();
  const listData = useSelector(getListImportWareHouse);
  const modal = React.useRef();
  const IsFocused = useIsFocused();
  const flatListRef = useRef();
  const role = useSelector(getRole);

  useEffect(() => {
    dispatch(getItemApi());
    dispatch(getImportWareHouseApi());
    dispatch(getReceiptImportWareHouseApi());
  }, [IsFocused, dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(getImportWareHouseApi());
  });

  const toTop = () => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  };

  const onSucessGetITem = response => {
    props.navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.DETAIL, {
      ...response,
    });
  };

  const onViewItem = idItems => {
    //console.log(idItems);
    dispatch(getDetailsImport(idItems, onSucessGetITem));
  };

  const onSubmit = data => {
    if (data?.idReceiptImport) {
      props.navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.CAMERA, {
        ...data,
      });
    }
  };

  const openImport = () => {
    props.navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.IMPORT_QUICKLY);
  };

  const create = () => {
    modal.current.show(onSubmit, 1);
  };

  const createQuickLy = () => {
    props.navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.CAMERA_QUICKLY);
  };

  const createOcrDetect = () => {
    props.navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.CAMERA_OCR);
  };

  const _listHeaderComponent = () => (
    <View style={[styles.wrapHeader]}>
      <TouchableOpacity
        style={{display: 'flex', flexDirection: 'row'}}
        onPress={() => create()}>
        <Icon size={6} as={FontAwesome} name="plus" />
        <Text style={[styles.textHeader, {marginRight: 3}]}>
          {translate('ctp:importWareHouse:create')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginLeft: 5,
        }}
        onPress={() => createQuickLy()}>
        <Icon size={6} as={FontAwesome} name="camera" color={APP_COLOR} />
        <Text style={[styles.textHeader, {marginRight: 3}]}>
          {translate('ctp:importWareHouse:quickLy')}
        </Text>
      </TouchableOpacity>

      {/*<TouchableOpacity*/}
      {/*  style={{*/}
      {/*    display: 'flex',*/}
      {/*    flexDirection: 'row',*/}
      {/*    justifyContent: 'flex-end',*/}
      {/*    marginLeft: 5,*/}
      {/*  }}*/}
      {/*  onPress={() => createOcrDetect()}>*/}
      {/*  <Icon size={6} as={FontAwesome} name="camera-retro" color={APP_COLOR} />*/}
      {/*  <Text style={[styles.textHeader, {marginRight: 3}]}>*/}
      {/*    {translate('ctp:importWareHouse:ocr')}*/}
      {/*  </Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={props.navigation}
        title={translate('ctp:importWareHouse:title')}
      />
      <Divider />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <_listHeaderComponent />
        <ListView
          dispatch={dispatch}
          flatListRef={flatListRef}
          data={listData}
          role={role}
          onRefresh={onRefresh}
          onViewItem={onViewItem}
        />
        <View style={styles.button}>
          <TouchableOpacity onPress={toTop}>
            <Icon size={25} as={FontAwesome} color={'#FFF'} name="arrow-up" />
          </TouchableOpacity>
        </View>
      </View>
      <ModalReceipt ref={modal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  viewContent: {flex: 10, backgroundColor: '#FFFFFF'},
  textContent: {fontSize: 14, marginLeft: 10},
  textTitle: {fontSize: 20, fontWeight: 'bold', lineHeight: 26, marginLeft: 10},
  textIndex: {fontSize: 16, fontWeight: 'bold', lineHeight: 22, marginLeft: 10},
  underlined: {
    height: 1,
    backgroundColor: '#000000',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'rgb(0,74,173)',
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
  },
  wrapHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    height: 40,
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 5,
    marginTop: 25,
  },
});
