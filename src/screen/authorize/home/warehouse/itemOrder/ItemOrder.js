import React, {memo, useEffect, useState, useCallback} from 'react';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import {
  Box,
  HStack,
  Icon,
  Text,
  Image,
  Spacer,
  VStack,
  Divider,
  useToast,
  ScrollView,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {translate} from '../../../../../common/i18n/translate';
import {Block} from '../../../../../library/components/Block/Block';
import Header from '../../../../../components/Header';
import {APP_COLOR} from '../../../../../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {numberFormat} from '../../../../../until';
import {CustomText} from '../../../../../library/components';
import {getDvtCode} from '../../../../unAuthorize/login/redux/appReducers';
export function ItemOrder({navigation, route}) {
  const [list, setList] = useState(route?.params ?? {});
  const [creatDate, setCreateDate] = useState(new Date(list?.createDate));
  const dvt = useSelector(getDvtCode);

  const RenderPrice = ({item}) => {
    if (item?.totalPrice === item?.totalSale) {
      return (
        <CustomText
          fontSize="xs"
          color="coolGray.900"
          _dark={{
            color: 'warmGray.50',
          }}
          style={{fontSize: 16}}
          alignSelf="flex-end">
          {numberFormat(item?.totalPrice)}
        </CustomText>
      );
    } else {
      return (
        <CustomText
          fontSize="xs"
          color="coolGray.900"
          _dark={{
            color: 'warmGray.50',
          }}
          style={{fontSize: 16, textDecorationLine: 'line-through'}}
          alignSelf="flex-end">
          {numberFormat(item?.totalPrice)}
        </CustomText>
      );
    }
  };

  const RenderItem = ({item}) => {
    return (
      <VStack>
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
              style={{fontSize: 16, color: 'black'}}
              alignSelf="flex-start">
              {item?.itemsResponseDTO?.name}{' '}
              {dvt.find(e => e.dvtCode === item?.dvtCode)?.name}
            </CustomText>
          </View>

          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <RenderPrice item={item} />
          </View>
        </VStack>

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
              style={{fontSize: 15}}
              alignSelf="flex-start">
              {numberFormat(
                item?.itemsResponseDTO?.priceItemsDtos.find(
                  e => e.dvtCode === item?.dvtCode,
                )?.priceItems,
              )}
            </CustomText>
            <CustomText
              fontSize="xs"
              _dark={{
                color: 'warmGray.50',
              }}
              style={{fontSize: 15, color: APP_COLOR}}>
              {' X '}
              {item?.quality}
            </CustomText>
          </View>

          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <CustomText
              fontSize="xs"
              color="coolGray.900"
              _dark={{
                color: 'warmGray.50',
              }}
              style={{fontSize: 16}}
              alignSelf="flex-end">
              {item?.totalPrice !== item?.totalSale &&
                numberFormat(item?.totalSale)}
            </CustomText>
          </View>
        </VStack>
        <Divider style={{marginVertical: 15}} />
      </VStack>
    );
  };
  //console.log(133);
  return (
    <Block block>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={navigation}
        title={translate('ctp:orderDetails:details')}
      />
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.itemCard}>
            <CustomText style={styles.textHeader}>
              Mã đơn hàng: {list?.code}
            </CustomText>
            {list?.deleteFlg === 0 ? (
              <CustomText style={styles.textCancel}>Đã hủy</CustomText>
            ) : (
              <CustomText style={styles.textHeaderSucess}>
                Hoàn thành
              </CustomText>
            )}

            {list?.deleteFlg === 0 && (
              <VStack
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  alignSelf="flex-end">
                  {list?.reasonName}
                </CustomText>
              </VStack>
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
                <Icon
                  size={5}
                  as={FontAwesome}
                  color="warmGray.800"
                  name="user"
                />
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16}}
                  alignSelf="flex-end">
                  Khách hàng
                </CustomText>
              </View>

              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16}}
                  alignSelf="flex-end">
                  {list?.customerDto?.name}
                </CustomText>
              </View>
            </VStack>
            <Divider style={{marginVertical: 15}} />

            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
              justifyContent="space-between">
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Icon
                  size={5}
                  color="warmGray.800"
                  as={FontAwesome}
                  name="phone"
                />
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16}}
                  alignSelf="flex-end">
                  Số điện thoại
                </CustomText>
              </View>

              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16}}
                  alignSelf="flex-end">
                  {list?.customerDto?.tel}
                </CustomText>
              </View>
            </VStack>
            <Divider style={{marginVertical: 15}} />

            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
              }}
              justifyContent="space-between">
              <View style={{flexDirection: 'row'}}>
                <Icon
                  size={5}
                  color="warmGray.800"
                  as={FontAwesome}
                  name="user-circle-o"
                />
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16, marginLeft: 3}}
                  alignSelf="flex-end">
                  Người bán
                </CustomText>
              </View>

              <View style={{display: 'flex'}}>
                <CustomText
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16, width: '100%'}}>
                  {list?.createBy}
                </CustomText>
              </View>
            </VStack>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.itemCard}>
            {list?.detailsItemOrders?.map((e, index) => {
              return <RenderItem item={e} />;
            })}
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
                  Tổng tiền hàng
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
                  {numberFormat(list?.totalPrice)}
                </Text>
              </View>
            </VStack>
            <Divider style={{marginVertical: 15}} />

            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
              }}
              justifyContent="space-between">
              <View style={{flexDirection: 'row'}}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16, marginLeft: 3}}
                  alignSelf="flex-end">
                  Thành tiền
                </CustomText>
              </View>

              <View style={{display: 'flex'}}>
                <Text
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16}}
                  alignSelf="flex-end">
                  {numberFormat(list?.totalSale)}
                </Text>
              </View>
            </VStack>

            <Divider style={{marginVertical: 15}} />

            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
              }}
              justifyContent="space-between">
              <View style={{flexDirection: 'row'}}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16, marginLeft: 3}}
                  alignSelf="flex-end">
                  Khách hàng đã thanh toán
                </CustomText>
              </View>

              <View style={{display: 'flex'}}>
                <CustomText
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16, width: '100%'}}>
                  {numberFormat(list?.billDto?.totalPriceCustomer)}
                </CustomText>
              </View>
            </VStack>

            <Divider style={{marginVertical: 15}} />

            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
              }}
              justifyContent="space-between">
              <View style={{flexDirection: 'row'}}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16, marginLeft: 3}}
                  alignSelf="flex-end">
                  Hình thức thanh toán
                </CustomText>
              </View>

              <View style={{display: 'flex'}}>
                <CustomText
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16, width: '100%'}}>
                  {list?.billDto?.namePayment}
                </CustomText>
              </View>
            </VStack>
          </View>
        </View>
      </ScrollView>
    </Block>
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
});
