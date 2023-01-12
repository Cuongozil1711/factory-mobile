import * as React from 'react';
import {Divider, ModalReceipt} from '../../../../../library/components';
import {Icon, Text, View} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useRef} from 'react';
import {getDetailsImport} from '../importWareHouse/redux/ImportWareHouseApi';
import {APP_SCREEN} from '../../../../../common/screenType';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {translate} from '../../../../../common/i18n/translate';
import Header from '../../../../../components/Header';
import {getListPromotion} from './redux/PromotionSlice';
import {getPromotionApi} from './redux/PromotionApi';
import {ListView} from './component/ListViewComponent';

export function Promotion(props) {
  const dispatch = useDispatch();
  const listData = useSelector(getListPromotion);
  const modal = React.useRef();
  const IsFocused = useIsFocused();
  const flatListRef = useRef();

  useEffect(() => {
    dispatch(getPromotionApi());
  }, [IsFocused, dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(() => {
    dispatch(getPromotionApi());
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

  const create = () => {
    modal.current.show(onSubmit, 1);
  };

  const _listHeaderComponent = () => (
    <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <View style={[styles.wrapHeader]}>
        <TouchableOpacity
          style={{display: 'flex', flexDirection: 'row'}}
          onPress={() => create()}>
          <Icon size={6} as={FontAwesome} name="plus" />
          <Text style={[styles.textHeader, {marginRight: 3}]}>
            {translate('ctp:promotion:create')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.wrapHeader1]}>
        <Text style={[styles.textHeader, {marginRight: 3}]}>
          Tổng: {listData.length}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={props.navigation}
        title={translate('ctp:promotion:title')}
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
  flatList: {
    width: '100%',
    paddingHorizontal: 5,
    marginTop: 25,
  },
});
