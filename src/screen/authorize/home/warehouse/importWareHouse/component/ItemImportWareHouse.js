import React, {memo, useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {HStack, Icon, Text, VStack, Divider, ScrollView} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomText, ModalViewImage} from '../../../../../../library/components';
import {numberFormat} from '../../../../../../until';
import {APP_COLOR} from '../../../../../../config';
import {translate} from '../../../../../../common/i18n/translate';
import Header from '../../../../../../components/Header';
import {ItemRender} from './ItemRender';
import {APP_SCREEN} from '../../../../../../common/screenType';
import {useSelector} from 'react-redux';
import {getRole} from '../../../../../unAuthorize/login/redux/appReducers';
export function ItemImportWareHouse({navigation, route}) {
  const data = route?.params?.data ?? [];
  const creatDate = new Date(route?.params?.data[0]?.createDate);
  const [totalPrice, setTotalPrice] = useState(0);
  const modal = React.useRef();
  const role = useSelector(getRole);

  console.log(route?.params);

  useEffect(() => {
    let total = 0;
    route?.params?.data?.forEach(e => {
      total += e.totalPrice;
    });
    setTotalPrice(total);
    data?.map(e => {
      return {
        ...e,
        role: role,
      };
    });
  }, [route?.params]);

  /**
   * Render kho?ng tr?ng gi?a c�c item
   */
  const _ItemSeparatorComponent = () => (
    <View style={[styles.viewSpace]}>
      <Divider />
    </View>
  );

  const onSubmit = () => {
    //console.log('2');
  };

  /**
   * G�n key cho c�c item flatlist
   * @param any item
   * @param number index
   */
  const _keyExtractor = item => item.id.toString();

  const openCameraDetect = () => {
    //console.log(route?.params?.idReceiptImport);
    if (route?.params?.imageReceipt) {
      modal.current.show(onSubmit, route?.params?.imageReceipt);
    } else {
      navigation.navigate(
        APP_SCREEN.HOME.IMPORT_WAREHOUSE.DETAIL_ITEM_IMAGE,
        route?.params?.idReceiptImport,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={navigation}
        title={translate('ctp:importWareHouse:details')}
      />
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.itemCard}>
            <CustomText style={styles.textHeader}>
              Mã phiếu nhập: {route?.params?.code}
            </CustomText>
            <CustomText style={styles.textHeader}>
              Tên phiếu nhập: {route?.params?.receiptImportWareHouseDto?.name}
            </CustomText>
            {route?.params?.receiptImportWareHouseDto?.state !== 'COMPLETE' ? (
              <CustomText style={styles.textCancel}>Đã hủy</CustomText>
            ) : (
              <CustomText style={styles.textHeaderSucess}>
                Hoàn thành
              </CustomText>
            )}

            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon size={4} as={FontAwesome} name="clock-o" />
              <CustomText
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                style={{fontSize: 15}}
                alignSelf="flex-end">
                {creatDate.getDate() +
                  '/' +
                  (creatDate.getMonth() + 1) +
                  '/' +
                  (creatDate.getFullYear() + 1) +
                  ' ' +
                  creatDate.getHours() +
                  ':' +
                  creatDate.getMinutes()}
              </CustomText>
            </VStack>

            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CustomText>Người nhập kho: </CustomText>
              <CustomText
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                style={{fontSize: 15}}
                alignSelf="flex-end">
                {route?.params.createByName}
              </CustomText>
            </VStack>

            <TouchableOpacity
              onPress={() => openCameraDetect()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon size={4} as={FontAwesome} name="image" />
              <CustomText
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                style={{fontSize: 15}}
                alignSelf="flex-end">
                {route?.params?.imageReceipt
                  ? 'Xem ảnh phiếu đính kèm'
                  : 'Đính kèm ảnh phiếu nhập'}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.itemCard}>
            <HStack>
              <FlatList
                style={styles.flatList}
                data={data}
                renderItem={ItemRender}
                keyExtractor={_keyExtractor}
              />
            </HStack>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.itemCard}>
            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
              justifyContent="space-between">
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16}}
                  alignSelf="flex-end">
                  {role !== 'ROLE_K' && 'Tổng tiền hàng'}
                </CustomText>
              </View>

              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16}}
                  alignSelf="flex-end">
                  {role !== 'ROLE_K' && numberFormat(totalPrice)}
                </Text>
              </View>
            </VStack>
          </View>
        </View>
        <ModalViewImage ref={modal} />
      </ScrollView>
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
  card: {
    backgroundColor: '#FFF',
    marginVertical: 10,
    borderRadius: 10,
  },
  itemCard: {
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 10,
  },
  textHeader: {
    fontSize: 15,
  },
  textHeaderSucess: {
    fontSize: 14,
    color: APP_COLOR,
  },
  textCancel: {
    fontSize: 14,
    color: 'rgb(255,98,89)',
    textDecorationLine: 'line-through',
  },
  flatList: {
    width: '100%',
  },
  viewSpace: {
    paddingVertical: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
