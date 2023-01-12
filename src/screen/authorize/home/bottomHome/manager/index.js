import React, {useCallback, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Divider, HStack, Icon, Image, View} from 'native-base';
import {translate} from '../../../../../common/i18n/translate';
import Header from '../../../../../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomText} from '../../../../../library/components';
import {APP_SCREEN} from '../../../../../common/screenType';
import {useDispatch, useSelector} from 'react-redux';
import {getItemApi, getWareHouseApi} from './redux/ManagerApi';
import {getRole} from '../../../../unAuthorize/login/redux/appReducers';
export function Manager(props) {
  const dispatch = useDispatch();
  const role = useSelector(getRole);

  useEffect(() => {
    dispatch(getWareHouseApi());
    dispatch(getItemApi());
    // dispatch(getAddressApi());
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={false}
        iconApp={true}
        leftIcon={true}
        title={translate('ctp:manager')}
      />

      <Divider />

      <ScrollView
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 100,
            marginVertical: 10,
            marginHorizontal: 5,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              paddingHorizontal: 25,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              width: '48%',
              ...styles.leftView,
            }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.MAIN)
              }
              style={{
                paddingVertical: 25,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                size={25}
                as={FontAwesome}
                color="#495057"
                name="arrow-circle-o-down"
              />
              <CustomText style={{fontSize: 16}}>Nhập kho</CustomText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingHorizontal: 25,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              width: '48%',
              ...styles.leftView,
            }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(APP_SCREEN.HOME.EXPORT_WAREHOUSE.MAIN)
              }
              style={{
                paddingVertical: 25,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                size={25}
                as={FontAwesome}
                color="#495057"
                name="location-arrow"
              />
              <CustomText style={{fontSize: 16}}>Xuất kho</CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 5,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              paddingHorizontal: 25,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              width: '48%',
              ...styles.leftView,
            }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(
                  APP_SCREEN.HOME.RECEIPT_IMPORT_WAREHOUSE.MAIN,
                )
              }
              style={{
                paddingVertical: 25,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                size={25}
                as={FontAwesome}
                color="#495057"
                name="angle-double-down"
              />
              <CustomText style={{fontSize: 16}}>Phiếu nhập kho</CustomText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingHorizontal: 25,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              width: '48%',
              ...styles.leftView,
            }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(
                  APP_SCREEN.HOME.RECEIPT_EXPORT_WAREHOUSE.MAIN,
                )
              }
              style={{
                paddingVertical: 25,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                size={25}
                as={FontAwesome}
                color="#495057"
                name="angle-double-up"
              />
              <CustomText style={{fontSize: 16}}>Phiếu xuất kho</CustomText>
            </TouchableOpacity>
          </View>
        </View>

        {(role === 'ROLE_A' || role === 'ROLE_S') && (
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 5,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  paddingHorizontal: 25,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  width: '48%',
                  ...styles.leftView,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(APP_SCREEN.HOME.PROMOTION.MAIN)
                  }
                  style={{
                    paddingVertical: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    size={25}
                    as={FontAwesome}
                    color="#495057"
                    name="maxcdn"
                  />
                  <CustomText style={{fontSize: 16}}>Khuyến mại</CustomText>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  paddingHorizontal: 25,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  width: '48%',
                  ...styles.leftView,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(APP_SCREEN.HOME.DEBIT.MAIN)
                  }
                  style={{
                    paddingVertical: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    size={25}
                    as={FontAwesome}
                    color="#495057"
                    name="first-order"
                  />
                  <CustomText style={{fontSize: 16}}>Khách nợ</CustomText>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 5,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  paddingHorizontal: 25,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  width: '48%',
                  ...styles.leftView,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(APP_SCREEN.HOME.CUSTOMER.MAIN)
                  }
                  style={{
                    paddingVertical: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    size={25}
                    as={FontAwesome}
                    color="#495057"
                    name="group"
                  />
                  <CustomText style={{fontSize: 16}}>Khách hàng</CustomText>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  paddingHorizontal: 25,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  width: '48%',
                  ...styles.leftView,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(APP_SCREEN.HOME.EMPLOYEE.MAIN)
                  }
                  style={{
                    paddingVertical: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    size={25}
                    as={FontAwesome}
                    color="#495057"
                    name="bookmark"
                  />
                  <CustomText style={{fontSize: 16}}>Nhân viên</CustomText>
                </TouchableOpacity>
              </View>
            </View>
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
  leftView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
