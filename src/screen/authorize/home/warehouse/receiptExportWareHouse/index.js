import * as React from 'react';
import {Icon, Text, View} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useRef} from 'react';
import {Divider, ModalCreate} from '../../../../../library/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../../../../components/Header';
import {translate} from '../../../../../common/i18n/translate';
import {useIsFocused} from '@react-navigation/native';
import {ListView} from './component/ListView';
import {
  createReceiptExportWareHouseApi,
  getCompany,
  getReceiptExportWareHouseApi,
  getWareHouseTo,
} from './redux/ReceiptExportWareHouseApi';
import {getListReceiptExportWareHouse} from './redux/ReceiptExportWareHouseSlice';
import {getCode} from '../../../../../config';

export function ReceiptExportWareHouse(props) {
  const dispatch = useDispatch();
  const listData = useSelector(getListReceiptExportWareHouse);
  //console.log('listData: ' + JSON.stringify(listData));
  const IsFocused = useIsFocused();
  const flatListRef = useRef();
  useEffect(() => {
    dispatch(getReceiptExportWareHouseApi());
    dispatch(getCompany());
    dispatch(getWareHouseTo());
  }, [IsFocused, dispatch]);
  const modal = React.useRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(() => {
    dispatch(getReceiptExportWareHouseApi());
  });

  const toTop = () => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  };
  const onSubmit = data => {
    //console.log('data: ' + data);
    // dispatch(getOrderApi('/' + item));
    dispatch(
      createReceiptExportWareHouseApi(
        {
          ...data,
          code: getCode('RX'),
        },
        onSuccess,
      ),
    );
  };

  const onSuccess = () => {
    dispatch(getReceiptExportWareHouseApi());
  };

  const create = () => {
    modal.current.show(onSubmit, 2);
  };

  const _listHeaderComponent = () => (
    <View style={[styles.wrapHeader]}>
      <TouchableOpacity
        onPress={() => create()}
        style={{display: 'flex', flexDirection: 'row'}}>
        <Icon size={6} as={FontAwesome} name="plus" />
        <Text style={[styles.textHeader, {marginRight: 3}]}>
          {translate('ctp:receiptExportWareHouse:create')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={props.navigation}
        title={translate('ctp:receiptExportWareHouse:title')}
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
          onRefresh={onRefresh}
        />
        <View style={styles.button}>
          <TouchableOpacity onPress={toTop}>
            <Icon size={25} as={FontAwesome} color={'#FFF'} name="arrow-up" />
          </TouchableOpacity>
        </View>
      </View>
      <ModalCreate ref={modal} />
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
});
