import React, {useEffect, useState} from 'react';
import Header from '../../../../../../components/Header';
import {translate} from '../../../../../../common/i18n/translate';
import {Block} from '../../../../../../library/components/Block/Block';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CheckIcon, Input, Select, Text} from 'native-base';
import {APP_COLOR} from '../../../../../../config';
import {CustomText} from '../../../../../../library/components';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDistrict,
  getProvince,
  getUser,
  getWards,
} from '../redux/ProfileSlice';
import {
  getDistrictApi,
  getProvinceApi,
  getWardsApi,
  updateUserApi,
} from '../redux/ProfileApi';
import {APP_SCREEN} from '../../../../../../common/screenType';

export default function ProfileEdit({navigation}) {
  const userData = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProvinceApi());
    data?.provinceId && dispatch(getDistrictApi(data?.provinceId));
    data?.districtId && dispatch(getWardsApi(data?.districtId));
  }, []);

  const province = useSelector(getProvince);
  const district = useSelector(getDistrict);
  const wards = useSelector(getWards);

  const defaultData = {
    firstName: userData?.fullNameDto?.firstName,
    lastName: userData?.fullNameDto?.lastName,
    provinceId: userData?.addressDto?.provinceId,
    wardId: userData?.addressDto?.wardId,
    districtId: userData?.addressDto?.districtId,
    tel: userData?.tel,
    cmt: userData?.cmt,
    address: userData?.addressDto?.name,
    birthDay: userData?.birthDay,
  };

  const onSubmit = () => {
    //console.log(data);
    let userPayload = {
      ...userData,
      fullNameDto: {
        ...userData?.fullNameDto,
        firstName: data?.firstName,
        lastName: data?.lastName,
      },
      addressDto: {
        ...userData?.addressDto,
        provinceId: data?.provinceId,
        wardId: data?.wardId,
        districtId: data?.districtId,
        name: data?.address,
      },
      tel: data?.tel,
      cmt: data?.cmt,
      birthDay: data?.birthDay,
    };
    dispatch(updateUserApi(userPayload, onSucessGetITem));
  };

  const onSucessGetITem = response => {
    Alert.alert('Th??ng b??o', 'C???p nh???t th??nh c??ng', [
      {
        text: 'Ok',
        onPress: () => {
          // navigation.navigate(APP_SCREEN.HOME.PROFILE_EDIT);
        },
      },
    ]);
    // navigation.navigate(APP_SCREEN.HOME.PROFILE_EDIT);
  };

  const [data, setData] = useState(defaultData);

  return (
    <Block block>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={navigation}
        title={translate('ctp:user')}
      />
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={{width: '100%', marginVertical: 10}}>
            <CustomText
              style={{fontSize: 16, marginVertical: 5, marginHorizontal: 5}}>
              Li??n h???
            </CustomText>
            <View style={styles.rowInput}>
              <Input
                value={data?.firstName}
                onChangeText={e => {
                  setData({
                    ...data,
                    firstName: e,
                  });
                }}
                variant="filled"
                placeholder="H??? t??n"
                style={{
                  borderTopWidth: 0.2,
                  borderBottomWidth: 0.2,
                  backgroundColor: '#FFFFFF',
                }}
              />
              <Input
                value={data?.lastName}
                variant="filled"
                placeholder="T??n ?????m"
                onChangeText={e => {
                  setData({
                    ...data,
                    lastName: e,
                  });
                }}
                style={{
                  borderTopWidth: 0.2,
                  borderBottomWidth: 0.2,
                  backgroundColor: '#FFFFFF',
                }}
              />
            </View>
          </View>

          <View style={{width: '100%'}}>
            <CustomText
              style={{fontSize: 16, marginVertical: 5, marginHorizontal: 5}}>
              S??? ??i???n tho???i
            </CustomText>
            <View style={styles.rowInput}>
              <Input
                value={data?.tel}
                onChangeText={e => {
                  setData({
                    ...data,
                    tel: e,
                  });
                }}
                variant="filled"
                placeholder="S??? ??i???n tho???i"
                style={{
                  borderTopWidth: 0.2,
                  borderBottomWidth: 0.2,
                  backgroundColor: '#FFFFFF',
                }}
              />
            </View>
          </View>

          <View style={{width: '100%'}}>
            <CustomText
              style={{fontSize: 16, marginVertical: 5, marginHorizontal: 5}}>
              S??? ch???ng minh th??
            </CustomText>
            <View style={styles.rowInput}>
              <Input
                value={data?.cmt}
                variant="filled"
                onChangeText={e => {
                  setData({
                    ...data,
                    cmt: e,
                  });
                }}
                placeholder="S??? ch???ng minh th??"
                style={{
                  borderTopWidth: 0.2,
                  borderBottomWidth: 0.2,
                  backgroundColor: '#FFFFFF',
                }}
              />
            </View>
          </View>

          <View style={{width: '100%'}}>
            <CustomText
              style={{fontSize: 16, marginVertical: 5, marginHorizontal: 5}}>
              ?????a ch???
            </CustomText>
            <Select
              minWidth="200"
              accessibilityLabel="Ch???n t???nh th??nh"
              placeholder="Ch???n t???nh th??nh"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              selectedValue={data?.provinceId}
              onValueChange={itemValue => {
                setData({
                  ...data,
                  provinceId: itemValue,
                });

                dispatch(getDistrictApi(itemValue));
              }}
              mt="1">
              {province.map(e => {
                return <Select.Item label={e.name} value={e.provinceId} />;
              })}
            </Select>
            <Select
              minWidth="200"
              accessibilityLabel="Ch???n qu???n huy???n"
              placeholder="Ch???n qu???n huy???n"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              selectedValue={data?.districtId}
              onValueChange={itemValue => {
                setData({
                  ...data,
                  districtId: itemValue,
                });
                dispatch(getWardsApi(itemValue));
              }}
              mt="1">
              {district.map(e => {
                return <Select.Item label={e.name} value={e.districtId} />;
              })}
            </Select>
            <Select
              minWidth="200"
              accessibilityLabel="Ch???n ph?????ng x??"
              placeholder="Ch???n ph?????ng x??"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              selectedValue={data?.wardId}
              onValueChange={itemValue =>
                setData({
                  ...data,
                  wardId: itemValue,
                })
              }
              mt="1">
              {wards.map(e => {
                return <Select.Item label={e.name} value={e.wardId} />;
              })}
            </Select>
            <View style={styles.rowInput}>
              <Input
                value={data?.address}
                variant="filled"
                onChangeText={e => {
                  setData({
                    ...data,
                    address: e,
                  });
                }}
                placeholder="?????a ch??? chi ti???t"
                style={{
                  borderTopWidth: 0.2,
                  borderBottomWidth: 0.2,
                  backgroundColor: '#FFFFFF',
                }}
              />
            </View>
          </View>

          <View
            style={{
              width: '50%',
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
                C???p nh???t
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Block>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  rowInput: {
    width: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapDialog: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    paddingBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rowButton: {
    marginTop: 25,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 15,
    paddingTop: 5,
    fontWeight: '700',
  },
  viewSpace: {
    flex: 1,
  },
  textMsg: {
    textAlign: 'center',
    color: '#333333',
  },
  columnText: {
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '25%',
  },
  columnText1: {
    width: '35%',
    justifyContent: 'flex-end',
  },
  columnText2: {
    justifyContent: 'flex-end',
    width: '20%',
  },
});
