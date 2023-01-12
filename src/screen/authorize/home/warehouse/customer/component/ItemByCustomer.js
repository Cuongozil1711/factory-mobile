import React, {useCallback, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider, Icon, Text, View} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getOrderEmpId} from '../redux/CustomerSlice';
import {getListOrderByCustomer} from '../redux/CustomerApi';
import {CustomText} from '../../../../../../library/components';
import Header from '../../../../../../components/Header';
import {translate} from '../../../../../../common/i18n/translate';
import {ListViewOrder} from './ListViewOrderCustomer';
import {getDetailsOrder} from '../../../bottomHome/bookHotel/redux/orderShopApi';
import {APP_SCREEN} from '../../../../../../common/screenType';
import {numberFormat} from '../../../../../../until';
import {APP_COLOR} from '../../../../../../config';

export function ItemByCustomer({navigation, route}) {
  const idCustomer = route?.params;
  const dispatch = useDispatch();
  const listOrder = useSelector(getOrderEmpId);
  //console.log('listOrder: ' + JSON.stringify(listOrder));
  const flatListRef = useRef();
  const IsFocused = useIsFocused();
  useEffect(() => {
    dispatch(getListOrderByCustomer(idCustomer));
  }, [IsFocused, dispatch, idCustomer]);

  const onRefresh = useCallback(() => {
    dispatch(getListOrderByCustomer(idCustomer));
  });

  const toTop = () => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  };

  const onSucessGetITem = response => {
    navigation.navigate(APP_SCREEN.HOME.FOOTER_BOTTOM.ORDER.ITEM_ORDER, {
      ...response,
    });
  };

  const getTotalPrice = () => {
    let d = 0;
    listOrder.forEach(e => {
      d += e.totalPrice;
    });
    return d;
  };

  const onViewItem = idItems => {
    dispatch(getDetailsOrder(idItems, onSucessGetITem));
  };

  const _listHeaderComponent = () => (
    <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <View style={[styles.wrapHeader]}>
        <Text style={[styles.textHeader, {marginRight: 3}]}>
          Số lượng: {listOrder.length}
        </Text>
      </View>
      <View style={[styles.wrapHeader1]}>
        <Text style={[styles.textHeader, {marginRight: 3}]}>
          Tổng đã mua:{' '}
          <CustomText style={{color: APP_COLOR}}>
            {numberFormat(getTotalPrice())}
          </CustomText>
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={navigation}
        title={translate('ctp:order')}
      />
      <_listHeaderComponent />
      <Divider />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <ListViewOrder
          dispatch={dispatch}
          flatListRef={flatListRef}
          data={listOrder}
          onRefresh={onRefresh}
          onViewItem={onViewItem}
          // qrCode={qrCode}
        />
        <View style={styles.button}>
          <TouchableOpacity onPress={toTop}>
            <Icon size={25} as={FontAwesome} color={'#FFF'} name="arrow-up" />
          </TouchableOpacity>
        </View>
      </View>
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
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    height: 40,
  },
  wrapHeader1: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    height: 40,
  },
});
