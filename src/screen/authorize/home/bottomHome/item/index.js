import React, {useCallback, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../../../../components/Header';
import {translate} from '../../../../../common/i18n/translate';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCategoryApi,
  getDetailsItem,
  getItemApi,
  getPulisherApi,
  getStallApi,
} from './redux/itemApi';
import {ListView} from './components/ListViewComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base';
import {APP_SCREEN} from '../../../../../common/screenType';
import {useIsFocused} from '@react-navigation/native';
import {getItem} from './redux/itemReducers';
import {Divider} from '../../../../../library/components';
export function Item(props) {
  const dispatch = useDispatch();
  const lisItem = useSelector(getItem);
  const flatListRef = useRef();
  const IsFocused = useIsFocused();
  useEffect(() => {
    dispatch(getItemApi());
    dispatch(getStallApi());
    dispatch(getCategoryApi());
    dispatch(getPulisherApi());
  }, [IsFocused]);

  const toTop = () => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(() => {
    dispatch(getItemApi());
  });

  const onSucessGetITem = response => {
    props.navigation.navigate(APP_SCREEN.HOME.FOOTER_BOTTOM.ITEM.ITEM_SCANNER, {
      ...response,
    });
  };

  const qrCode = () => {
    props.navigation.navigate(APP_SCREEN.HOME.FOOTER_BOTTOM.ITEM.ITEM_DETAILS);
  };

  const onViewItem = idItems => {
    dispatch(getDetailsItem(idItems, onSucessGetITem));
  };

  const onChangeText = text => {
    dispatch(getItemApi(text));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={true}
        iconApp={true}
        leftIcon={true}
        onChangeText={onChangeText}
        title={translate('ctp:shop')}
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
          data={lisItem}
          onRefresh={onRefresh}
          onViewItem={onViewItem}
          qrCode={qrCode}
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
});
