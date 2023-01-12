import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Modal,
  Button,
  Input,
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Icon,
  Checkbox,
} from 'native-base';
import {APP_COLOR} from '../../../../../../../config';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {CustomText} from '../../../../../../../library/components';
import {useSelector} from 'react-redux';
import {
  getDvtCode,
  getRole,
} from '../../../../../../unAuthorize/login/redux/appReducers';
const getParsedDate = date => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!

  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return yyyy + '/' + mm + '/' + dd;
};
export const ItemScanner = props => {
  const {onSave, listItem, onClose, data} = props;
  const [details, setDetails] = React.useState(data);
  const role = useSelector(getRole);

  const [showDate, needShowDate] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dvt = useSelector(getDvtCode);
  const setValue = (field, value) => {
    switch (field) {
      case 'quality':
        setDetails({...details, quality: value});
        break;
      case 'numberBox':
        setDetails({...details, numberBox: value});
        break;
      case 'totalPrice':
        setDetails({...details, totalPrice: value});
        break;
      case 'id':
        setDetails({...details, id: value});
        break;
      default:
        break;
    }
  };

  const onChangeDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(getParsedDate(currentDate));
    needShowDate(false);
    setDetails({
      ...details,
      dateExpired: getParsedDate(currentDate),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{height: '100%'}}>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              display: 'flex',
              marginVertical: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <FormControl isRequired isInvalid>
              <Checkbox
                value={isChecked}
                colorScheme="danger"
                onChange={e => {
                  setIsChecked(e);
                  setValue('id', null);
                }}>
                Tự động
              </Checkbox>
            </FormControl>
          </View>
          <FormControl isRequired isInvalid>
            <CustomText style={{paddingVertical: 5}}>
              Mã vạch <CustomText style={{color: 'red'}}>*</CustomText>
            </CustomText>
            <Input
              type="number"
              value={details?.id}
              isDisabled={true}
              onChangeText={e => setValue('id', e)}
              focusOutlineColor={APP_COLOR}
              keyboardType="numeric"
            />
          </FormControl>

          <FormControl isRequired isInvalid>
            <CustomText style={{paddingVertical: 5}}>
              Tên sản phẩm <CustomText style={{color: 'red'}}>*</CustomText>
            </CustomText>
            <Select
              minWidth="200"
              accessibilityLabel="Chọn tên sản phẩm"
              placeholder="Chọn tên sản phẩm"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              selectedValue={details?.idItems}
              onValueChange={itemValue => {
                setDetails({
                  ...details,
                  idItems: itemValue,
                  priceItemsDtos: listItem?.find(e => e.id == itemValue)
                    ?.priceItemsDtos,
                });
              }}
              mt="1">
              {listItem.map(e => {
                return <Select.Item label={e.name} value={e.id} />;
              })}
            </Select>
            {!details?.priceItemsId && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Vui lòng chọn đơn vị!
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid>
            <CustomText style={{paddingVertical: 5}}>
              Đơn vị <CustomText style={{color: 'red'}}>*</CustomText>
            </CustomText>
            <Select
              minWidth="200"
              accessibilityLabel="Chọn đơn vị"
              placeholder="Chọn đơn vị"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              selectedValue={details?.priceItemsId}
              onValueChange={itemValue => {
                setDetails({
                  ...details,
                  priceItemsId: itemValue,
                  quality: details?.priceItemsDtos
                    .find(e => e.id === itemValue)
                    ?.quality.toString(),
                });
              }}
              mt="1">
              {details?.priceItemsDtos
                ?.filter(x => x.dvtCode !== '000')
                .map(e => {
                  let name =
                    dvt.find(i => e.dvtCode === i.dvtCode)?.name +
                    '_' +
                    e.quality;
                  return <Select.Item label={name} value={e.id} />;
                })}
            </Select>
            {!details?.priceItemsId && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Vui lòng chọn đơn vị!
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingVertical: 5,
              justifyContent: 'space-between',
            }}>
            <FormControl style={{width: '45%'}} isRequired isInvalid>
              <CustomText style={{paddingVertical: 5}}>
                Số lượng/ đơn vị{' '}
                <CustomText style={{color: 'red'}}>*</CustomText>
              </CustomText>
              <Input
                type="number"
                value={details?.quality}
                onChangeText={e => setValue('quality', e)}
                focusOutlineColor={APP_COLOR}
                keyboardType="numeric"
              />
            </FormControl>
            <FormControl style={{width: '45%'}} isRequired isInvalid>
              <CustomText style={{paddingVertical: 5}}>
                Số thùng <CustomText style={{color: 'red'}}>*</CustomText>
              </CustomText>
              <Input
                type="number"
                value={details?.numberBox}
                onChangeText={e => setValue('numberBox', e)}
                focusOutlineColor={APP_COLOR}
                keyboardType="numeric"
              />
            </FormControl>
          </View>
          <FormControl
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText style={{paddingVertical: 5}}>Ngày hết hạn: </CustomText>
            <TouchableOpacity
              style={styles.dateSection}
              onPress={() => {
                needShowDate(true);
              }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={details?.dateExpired}
                  placeholder={'YYYY/MM/DD'}
                />
                <Icon
                  color={APP_COLOR}
                  size={6}
                  as={FontAwesome}
                  name="calendar"
                />
              </View>

              {showDate && (
                <RNDateTimePicker
                  mode={'date'}
                  is24Hour={false}
                  display="default"
                  onChange={onChangeDatePicker}
                  value={new Date()}
                />
              )}
            </TouchableOpacity>
          </FormControl>
          {(role === 'ROLE_A' || role === 'ROLE_S') && (
            <FormControl>
              <CustomText style={{paddingVertical: 5}}>
                Giá nhập
                <CustomText style={{color: 'red'}}>*</CustomText>
              </CustomText>
              <Input
                value={details?.totalPrice}
                onChangeText={e => setValue('totalPrice', e)}
                type="number"
                focusOutlineColor={APP_COLOR}
                keyboardType="numeric"
              />
            </FormControl>
          )}
          <View style={styles.footer}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                onClose();
              }}>
              Hủy
            </Button>
            <Button
              style={{backgroundColor: APP_COLOR}}
              onPress={() => {
                onSave(details);
              }}>
              Thêm
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  dateSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: -80,
  },
  input: {
    textAlign: 'right',
    textAlignVertical: 'center',
    color: '#495057',
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
});
