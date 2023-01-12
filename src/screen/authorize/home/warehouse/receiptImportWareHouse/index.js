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
import {getListReceiptImportWareHouse} from './redux/ReceiptImportWareHouseSlice';
import {
  createReceiptImportWareHouseApi,
  getReceiptImportWareHouseApi,
} from './redux/ReceiptImportWareHouseApi';
import {ListView} from './component/ListView';
import {getCode} from '../../../../../config';
import {
  getCompany,
  getSupplier,
} from '../receiptExportWareHouse/redux/ReceiptExportWareHouseApi';

export function ReceiptImportWareHouse(props) {
  const dispatch = useDispatch();
  const listData = useSelector(getListReceiptImportWareHouse);
  const IsFocused = useIsFocused();
  const flatListRef = useRef();
  const modal = React.useRef();
  useEffect(() => {
    dispatch(getReceiptImportWareHouseApi());
    dispatch(getSupplier());
  }, [IsFocused, dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(() => {
    dispatch(getReceiptImportWareHouseApi());
  });

  const onSubmit = data => {
    //console.log('data: ' + data);
    // dispatch(getOrderApi('/' + item));
    dispatch(
      createReceiptImportWareHouseApi(
        {
          ...data,
          code: getCode('RI'),
        },
        onSuccess,
      ),
    );
  };

  const onSuccess = () => {
    dispatch(getReceiptImportWareHouseApi());
  };

  const create = () => {
    modal.current.show(onSubmit, 1);
  };

  const toTop = () => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  };

  const _listHeaderComponent = () => (
    <View style={[styles.wrapHeader]}>
      <TouchableOpacity
        style={{display: 'flex', flexDirection: 'row'}}
        onPress={() => create()}>
        <Icon size={6} as={FontAwesome} name="plus" />
        <Text style={[styles.textHeader, {marginRight: 3}]}>
          {translate('ctp:receiptImportWareHouse:create')}
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
        title={translate('ctp:receiptImportWareHouse:title')}
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
