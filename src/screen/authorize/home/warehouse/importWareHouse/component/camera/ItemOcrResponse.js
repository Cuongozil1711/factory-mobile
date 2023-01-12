import React, {memo, useEffect, useState, useCallback} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HStack, Icon, Text, VStack, Divider, ScrollView} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../../../../../components/Header';
import {translate} from '../../../../../../../common/i18n/translate';
import {CustomText} from '../../../../../../../library/components';
import {numberFormat} from '../../../../../../../until';
import {APP_COLOR} from '../../../../../../../config';
import {ItemRender} from './ItemRender';
import {apiImportQuickLy} from '../../redux/ImportWareHouseApi';
import {useDispatch} from 'react-redux';
import {hideLoading} from '../../../../../../../until/dialogHolder';
import {APP_SCREEN} from '../../../../../../../common/screenType';
export function ItemOcrResponse({navigation, route}) {
  const data = route?.params?.data ?? [];
  const creatDate = new Date(route?.params?.data[0]?.createDate);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const checkEdit =
    route?.params?.receiptExportWareHouseDto?.state === 'PROCESSING'
      ? true
      : false;

  useEffect(() => {
    let total = 0;
    route?.params?.data?.forEach(e => {
      total += e.totalPrice;
    });
    setTotalPrice(total);
  }, [route?.params]);

  /**
   * Render kho?ng tr?ng gi?a c�c item
   */
  const _ItemSeparatorComponent = () => (
    <View style={[styles.viewSpace]}>
      <Divider />
    </View>
  );

  /**
   * G�n key cho c�c item flatlist
   * @param any item
   * @param number index
   */
  const _keyExtractor = (item, index) => {
    return item.idReceiptImport.toString() + index;
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    data.forEach(e => {
      totalPrice += e.totalPrice;
    });
    return totalPrice;
  };

  const onSuccessQrCode = res => {
    //console.log('res: ' + res);
    if (res) {
      hideLoading();
      navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.MAIN);
    } else {
      hideLoading();
      Alert.alert('Thông báo', 'Phiếu nhập kho không tồn tại', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    }
  };

  const onSubmit = () => {
    //console.log(route?.params?.receiptExportWareHouseDto?.id);
    dispatch(
      apiImportQuickLy(
        route?.params?.receiptExportWareHouseDto?.id,
        onSuccessQrCode,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={navigation}
        title={translate('Chi tiết')}
      />
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.itemCard}>
            <CustomText style={styles.textHeader}>
              Mã phiếu xuất: {route?.params?.receiptExportWareHouseDto?.code}
            </CustomText>
            {route?.params?.receiptExportWareHouseDto?.state ===
            'PROCESSING' ? (
              <CustomText style={styles.textProcess}>Đang thực hiện</CustomText>
            ) : route?.params?.receiptExportWareHouseDto?.state !==
              'COMPLETE' ? (
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
                  creatDate.getFullYear() +
                  ' ' +
                  creatDate.getHours() +
                  ':' +
                  creatDate.getMinutes()}
              </CustomText>
            </VStack>

            <CustomText style={styles.textHeader}>
              Người xuất: {route?.params?.receiptExportWareHouseDto?.fullName}
            </CustomText>

            <CustomText style={styles.textHeader}>
              Địa chỉ:{' '}
              {route?.params?.receiptExportWareHouseDto?.companyName +
                ' - ' +
                route?.params?.receiptExportWareHouseDto?.wareHouseName}
            </CustomText>

            <CustomText style={styles.textHeader}>
              Chi nhánh xuất tới:{' '}
              {route?.params?.receiptExportWareHouseDto?.companyNameTo +
                ' - ' +
                route?.params?.receiptExportWareHouseDto?.wareHouseNameTo}
            </CustomText>
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
                  Tổng tiền nhập
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
                  {numberFormat(getTotalPrice())}
                </Text>
              </View>
            </VStack>
          </View>
        </View>

        {checkEdit && (
          <View
            style={{
              width: '100%',
              marginVertical: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => onSubmit()}
              style={{
                width: 100,
                height: 40,
                borderRadius: 5,
                backgroundColor: APP_COLOR,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText style={{color: '#FFF', textAlign: 'center'}}>
                Nhập kho
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
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
  textProcess: {
    fontSize: 14,
    color: APP_COLOR,
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
