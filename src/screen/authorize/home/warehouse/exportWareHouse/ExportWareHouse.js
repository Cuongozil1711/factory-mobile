import * as React from 'react';
import {Icon, Text, View} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {memo, useCallback, useEffect, useRef} from 'react';
import {APP_SCREEN} from '../../../../../common/screenType';
import {Divider} from '../../../../../library/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../../../../components/Header';
import {translate} from '../../../../../common/i18n/translate';
import {ListView} from './component';
import {getItemApi} from '../../bottomHome/item/redux/itemApi';
import {useIsFocused} from '@react-navigation/native';
import {equals} from 'ramda';
import {
  getDetailsExportById,
  getExportWareHouseApi,
} from './redux/ExportWareHouseApi';
import {getListExportWareHouse} from './redux/ExportWareHouseSlice';
import {ModalReceiptExport} from '../../../../../library/components/ModalReceipt/ModalReceiptExport';
import {getRole} from '../../../../unAuthorize/login/redux/appReducers';

const ExportWareHouse_Component = props => {
  const dispatch = useDispatch();
  const listData = useSelector(getListExportWareHouse);
  const IsFocused = useIsFocused();
  const flatListRef = useRef();
  const role = useSelector(getRole);
  useEffect(() => {
    dispatch(getItemApi());
    dispatch(getExportWareHouseApi());
  }, [IsFocused, dispatch]);

  const modal = React.useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(() => {
    dispatch(getExportWareHouseApi());
  });

  const toTop = () => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  };

  const onSubmit = data => {
    if (data?.idReceiptExport) {
      props.navigation.navigate(APP_SCREEN.HOME.EXPORT_WAREHOUSE.CAMERA, {
        ...data,
      });
    }
  };

  const create = () => {
    modal.current.show(onSubmit, 2);
  };

  const onSucessGetITem = response => {
    //console.log(response);
    props.navigation.navigate(APP_SCREEN.HOME.EXPORT_WAREHOUSE.DETAIL, {
      ...response,
    });
  };

  const onViewItem = idItems => {
    dispatch(getDetailsExportById(idItems, onSucessGetITem));
  };

  const _listHeaderComponent = () => (
    <View style={[styles.wrapHeader]}>
      <TouchableOpacity
        style={{display: 'flex', flexDirection: 'row'}}
        onPress={() => create()}>
        <Icon size={6} as={FontAwesome} name="plus" />
        <Text style={[styles.textHeader, {marginRight: 3}]}>
          {translate('ctp:exportWareHouse:create')}
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
        title={translate('ctp:exportWareHouse:title')}
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
          role={role}
        />
        <View style={styles.button}>
          <TouchableOpacity onPress={toTop}>
            <Icon size={25} as={FontAwesome} color={'#FFF'} name="arrow-up" />
          </TouchableOpacity>
        </View>
      </View>
      <ModalReceiptExport ref={modal} />
    </SafeAreaView>
  );
};

export const ExportWareHouse = memo(ExportWareHouse_Component, equals);

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
