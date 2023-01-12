import {View, Text, Icon, ScrollView} from 'native-base';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BarChart, Grid} from 'react-native-svg-charts';
import {translate} from '../../../../../common/i18n/translate';
import Header from '../../../../../components/Header';
import {APP_COLOR} from '../../../../../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomText, Divider} from '../../../../../library/components';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCount,
  getData,
  getExportAll,
  getListItem,
} from './redux/homeShopSlice';
import {
  getCountOrder,
  getListOrder,
  getStatistial,
  getStatistialList,
} from './redux/homeApi';
import {useIsFocused} from '@react-navigation/native';
import {ListView} from './components/ListViewComponent';
import {numberFormat} from '../../../../../until';

export function Home() {
  const dispatch = useDispatch();
  const data = useSelector(getData);
  const exportAll = useSelector(getExportAll);
  const dataBar = useSelector(getCount) ?? [];
  const listItemTop = useSelector(getListItem);
  const focused = useIsFocused();
  const [qualityExport, setQualityExport] = useState(0);
  const [qualityImport, setQualityImport] = useState(0);

  useEffect(() => {
    dispatch(getStatistial());
    dispatch(getCountOrder());
    dispatch(getListOrder());
    dispatch(getStatistialList(onCaulator));
  }, [dispatch, focused]);

  const onCaulator = res => {
    let total = 0;
    let totalPriceImport = 0;
    res?.forEach(e => {
      total += e?.totalPrice ?? 0;
      totalPriceImport += e?.totalPriceImport ?? 0;
    });
    console.log(totalPriceImport);
    setQualityExport(total);
    setQualityImport(totalPriceImport.toFixed(0));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={false}
        iconApp={false}
        leftIcon={false}
        title={translate('ctp:title')}
      />
      <Divider />
      <ScrollView>
        <View style={[styles.wrapHeader]}>
          <View style={{marginLeft: 15}}>
            <Icon color={APP_COLOR} size={4} as={FontAwesome} name="calendar" />
          </View>
          <View>
            <CustomText
              fontSize="xs"
              _dark={{
                color: 'warmGray.50',
              }}
              style={{fontSize: 14, marginLeft: 5}}
              alignSelf="flex-start">
              {data?.statisticalOrder?.sumQuality} đơn hàng
            </CustomText>
          </View>
        </View>

        {/*<View style={[styles.wrapHeader1]}>*/}
        {/*  <View style={{marginLeft: 10}}>*/}
        {/*    <CustomText*/}
        {/*      fontSize="xs"*/}
        {/*      _dark={{*/}
        {/*        color: 'warmGray.50',*/}
        {/*      }}*/}
        {/*      style={{fontSize: 16, marginLeft: 5, marginVertical: 10}}*/}
        {/*      alignSelf="flex-start">*/}
        {/*      Đơn hàng*/}
        {/*    </CustomText>*/}

        {/*    <CustomText*/}
        {/*      fontSize="xs"*/}
        {/*      _dark={{*/}
        {/*        color: 'warmGray.50',*/}
        {/*      }}*/}
        {/*      style={{fontSize: 16, marginLeft: 5, color: APP_COLOR}}*/}
        {/*      alignSelf="flex-start">*/}
        {/*      {data?.statisticalOrder?.sumQuality} đơn*/}
        {/*    </CustomText>*/}
        {/*  </View>*/}

        {/*  <View style={{marginRight: 10}}>*/}
        {/*    <CustomText*/}
        {/*      fontSize="xs"*/}
        {/*      _dark={{*/}
        {/*        color: 'warmGray.50',*/}
        {/*      }}*/}
        {/*      style={{fontSize: 16, marginLeft: 5, marginVertical: 10}}*/}
        {/*      alignSelf="flex-start">*/}
        {/*      Doanh thu*/}
        {/*    </CustomText>*/}

        {/*    <CustomText*/}
        {/*      fontSize="xs"*/}
        {/*      _dark={{*/}
        {/*        color: 'warmGray.50',*/}
        {/*      }}*/}
        {/*      style={{fontSize: 16, marginLeft: 5, color: APP_COLOR}}*/}
        {/*      alignSelf="flex-start">*/}
        {/*      {numberFormat(data?.statisticalRevenue?.sumPriceNow)}*/}
        {/*    </CustomText>*/}
        {/*  </View>*/}
        {/*</View>*/}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: 5,
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              paddingHorizontal: 25,
              backgroundColor: APP_COLOR,
              borderRadius: 10,
              width: '48%',
              ...styles.leftView,
            }}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                paddingVertical: 25,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon size={6} as={FontAwesome} color="#FFF" name="caret-up" />
                <CustomText style={{fontSize: 16, color: '#FFF'}}>
                  Doanh thu
                </CustomText>
              </View>
              <View>
                <CustomText style={{fontSize: 16, color: '#FFF'}}>
                  {numberFormat(qualityExport)}
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 25,
              backgroundColor: '#00A65A',
              borderRadius: 10,
              width: '48%',
              ...styles.leftView,
            }}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                paddingVertical: 25,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon size={6} as={FontAwesome} color="#FFF" name="money" />
                <CustomText style={{fontSize: 16, color: '#FFF'}}>
                  Lợi nhuận
                </CustomText>
              </View>
              <View>
                <CustomText style={{fontSize: 16, color: '#FFF'}}>
                  {numberFormat(qualityExport - qualityImport)}
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View
            style={{
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              ...styles.wrapHeader,
            }}>
            <View style={{marginLeft: 15}}>
              <Icon
                color={APP_COLOR}
                size={4}
                as={FontAwesome}
                name="calendar"
              />
            </View>
            <View>
              <CustomText
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                style={{fontSize: 14, marginLeft: 5}}
                alignSelf="flex-start">
                Tuần qua
              </CustomText>
            </View>
          </View>

          <View
            style={{
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
              ...styles.wrapHeader2,
            }}>
            <View
              style={{
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                style={{fontSize: 14, marginLeft: 5, alignSelf: 'flex-start'}}
                alignSelf="flex-start">
                {Math.max(...dataBar)}
              </CustomText>

              <CustomText
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                style={{
                  fontSize: 14,
                  marginLeft: 5,
                  alignSelf: 'flex-end',
                  marginTop: -5,
                }}
                alignSelf="flex-end">
                {Math.min(...dataBar)}
              </CustomText>
            </View>
            <BarChart
              style={{flex: 1, marginLeft: 8}}
              data={dataBar}
              svg={{fill: APP_COLOR}}
              contentInset={{top: 10, bottom: 5}}
              spacingOuter={30}
              spacing={0.2}
              gridMin={0}>
              <Grid direction={Grid.Direction.HORIZONTAL} />
            </BarChart>
          </View>
        </View>

        <View style={{marginTop: 10, borderRadius: 10}}>
          <View
            style={{
              ...styles.wrapHeader,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
            }}>
            <View style={{marginLeft: 15}}>
              <Icon
                color={APP_COLOR}
                size={4}
                as={FontAwesome}
                name="shopping-bag"
              />
            </View>
            <View>
              <CustomText
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                style={{fontSize: 14, marginLeft: 5}}
                alignSelf="flex-start">
                Sản phẩm bán chạy
              </CustomText>
            </View>
          </View>

          <View style={styles.wrapHeader3}>
            <ListView dispatch={dispatch} data={listItemTop} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  viewContent: {flex: 10, backgroundColor: '#cccccc'},
  textContent: {
    fontSize: 20,
    color: '#FF3700',
  },
  spaceBetween: {justifyContent: 'space-between'},
  textTitle: {fontSize: 20, fontWeight: 'bold', lineHeight: 26},
  underlined: {
    height: 1,
    backgroundColor: '#000000',
  },
  buttonTop: {flexDirection: 'row', justifyContent: 'flex-start'},
  wrapHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 20,
  },
  wrapHeader1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  wrapHeader2: {
    flexDirection: 'row',
    height: 200,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  wrapHeader3: {
    flexDirection: 'row',
    height: 300,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
});
