import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Icon, View} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {getOrder} from './redux/orderShopSlice';
import {
  getCustomerAPI,
  getDetailsOrder,
  getOrderApi,
} from './redux/orderShopApi';
import {useIsFocused} from '@react-navigation/native';
import Header from '../../../../../components/Header';
import {translate} from '../../../../../common/i18n/translate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ListView} from './components';
import {APP_COLOR, timesData} from '../../../../../config';
import {
  CustomText,
  Divider,
  ModalSucceeded,
} from '../../../../../library/components';
import {APP_SCREEN} from '../../../../../common/screenType';

export function OrderShop(props) {
  const dispatch = useDispatch();
  const listOrder = useSelector(getOrder);
  const flatListRef = useRef();
  const IsFocused = useIsFocused();
  const modal = React.useRef();
  const [times, setTimes] = useState('now');
  useEffect(() => {
    dispatch(getOrderApi('/' + times));
    dispatch(getCustomerAPI());
  }, [IsFocused, dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(() => {
    dispatch(getOrderApi('/' + times));
  });

  const onChangeText = text => {
    dispatch(getOrderApi('/' + times, text));
  };

  const toTop = () => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  };

  const onChangeTime = item => {
    setTimes(item);
    dispatch(getOrderApi('/' + item));
  };

  const searhQrCode = () => {
    props.navigation.navigate(APP_SCREEN.HOME.FOOTER_BOTTOM.ORDER.SEARCH_ORDER);
  };

  const onSucessGetITem = response => {
    props.navigation.navigate(APP_SCREEN.HOME.FOOTER_BOTTOM.ORDER.ITEM_ORDER, {
      ...response,
    });
  };

  const onViewItem = idItems => {
    dispatch(getDetailsOrder(idItems, onSucessGetITem));
  };

  /**
   * Render header
   */
  const HeaderFilter = () => (
    <View style={[styles.wrapHeader]}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <CustomText
          fontSize="xs"
          _dark={{
            color: 'warmGray.50',
          }}
          style={{color: APP_COLOR, fontSize: 15}}
          alignSelf="flex-end">
          {timesData.find(x => x.code === times)?.name}
        </CustomText>
        <Icon
          onPress={() => modal.current.show(onChangeTime, times)}
          color="#495057"
          size={6}
          as={FontAwesome}
          name="filter"
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Icon
          onPress={() => searhQrCode()}
          color="#495057"
          size={6}
          as={FontAwesome}
          name="qrcode"
        />
      </View>
      <ModalSucceeded ref={modal} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={true}
        iconApp={true}
        leftIcon={true}
        onChangeText={onChangeText}
        title={translate('ctp:order')}
      />
      <Divider />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <ListView
          dispatch={dispatch}
          flatListRef={flatListRef}
          data={listOrder}
          onRefresh={onRefresh}
          headerFilter={HeaderFilter}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    height: 40,
  },
});
