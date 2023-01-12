import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Modal,
  Button,
  Input,
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
} from 'native-base';
import {APP_COLOR} from '../../../../../../../config';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getDvtCode} from '../../../../../../unAuthorize/login/redux/appReducers';
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

export const ItemScanner = forwardRef((props, ref) => {
  const {onSave} = props;
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [details, setDetails] = React.useState();
  const [isFocus, setIsFocus] = React.useState(false);
  const dvt = useSelector(getDvtCode);

  useImperativeHandle(ref, () => ({
    openModal: data => {
      setDetails({
        ...data,
        priceItem: data.totalPrice / (data.numberBox * data.quantity),
        quality: data?.quantity,
        quantityOld: data?.quantityOld,
        numberBox: 0,
        dvtCode: null,
      });
      //console.log(details);
      setModalVisible(true);
    },
  }));

  const setValue = (field, value) => {
    switch (field) {
      case 'quality':
        let total = details?.priceItem * value * details?.numberBox;
        let totalPrice = 0;
        if (details.quality === details.quantityOld) {
          totalPrice = total;
        } else {
          totalPrice = total.toFixed(0);
        }
        setDetails({...details, quality: value, totalPrice: totalPrice});
        break;
      case 'numberBox':
        let total1 = details?.priceItem * value * details?.quality;
        let totalPrice1 = 0;
        if (details.quality === details.quantityOld) {
          totalPrice1 = total1;
        } else {
          totalPrice1 = total1.toFixed(0);
        }
        //console.log(totalPrice1);
        setDetails({...details, numberBox: value, totalPrice: totalPrice1});
      default:
        break;
    }
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        style={{marginTop: isFocus ? -30 : 0}}
        finalFocusRef={finalRef}>
        <Modal.Content style={{width: 280}}>
          <Modal.CloseButton />
          <Modal.Header>{details?.name}</Modal.Header>
          <Modal.Body>
            <FormControl isRequired isInvalid>
              <FormControl.Label>Đơn vị</FormControl.Label>
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
                    dvtCode: details?.priceItemsDtos
                      .find(e => e.id === itemValue)
                      ?.dvtCode.toString(),
                  });
                }}
                mt="1">
                {details?.priceItemsDtos
                  .filter(x => x.dvtCode !== '000')
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
                justifyContent: 'space-between',
              }}>
              <FormControl isRequired isInvalid>
                <FormControl.Label>Số lượng /đvt</FormControl.Label>
                <Input
                  onFocus={() => setIsFocus(true)}
                  type="number"
                  value={details?.quality}
                  onChangeText={e => setValue('quality', e)}
                  focusOutlineColor={APP_COLOR}
                  keyboardType="numeric"
                />
              </FormControl>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <FormControl isRequired isInvalid>
                <FormControl.Label>
                  Số {dvt.find(i => details?.dvtCode === i.dvtCode)?.name}
                </FormControl.Label>
                <Input
                  onFocus={() => setIsFocus(true)}
                  type="number"
                  value={details?.numberBox}
                  onChangeText={e => setValue('numberBox', e)}
                  focusOutlineColor={APP_COLOR}
                  keyboardType="numeric"
                />
              </FormControl>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Hủy
              </Button>
              <Button
                style={{backgroundColor: APP_COLOR}}
                onPress={() => {
                  setModalVisible(false);
                  onSave(details);
                }}>
                Lưu
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/*<HStack space="4" justifyContent="center" alignItems="center">*/}
      {/*  <Button*/}
      {/*    onPress={() => {*/}
      {/*      setModalVisible(!modalVisible);*/}
      {/*    }}>*/}
      {/*    Open Modal*/}
      {/*  </Button>*/}
      {/*</HStack>*/}
    </>
  );
});

export const styles = StyleSheet.create({
  dateSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    textAlign: 'right',
    textAlignVertical: 'center',
  },
});
