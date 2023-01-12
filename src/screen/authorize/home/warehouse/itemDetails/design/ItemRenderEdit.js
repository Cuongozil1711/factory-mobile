import React, {forwardRef, useImperativeHandle} from 'react';
import {Modal, Button, Input, FormControl} from 'native-base';
import {APP_COLOR} from '../../../../../../config';
import {useSelector} from 'react-redux';
import {getDvtCode} from '../../../../../unAuthorize/login/redux/appReducers';
export const ItemRenderEdit = forwardRef((props, ref) => {
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
        quality: data?.quality?.toString(),
        priceItems: data?.priceItems?.toString(),
      });
      setModalVisible(true);
    },
  }));

  const setValue = (field, value) => {
    switch (field) {
      case 'quality':
        setDetails({...details, quality: value});
        break;
      case 'priceItems':
        setDetails({...details, priceItems: value});
        break;
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
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            {dvt.find(x => x.dvtCode === details?.dvtCode)?.name}
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Số lượng</FormControl.Label>
              <Input
                onFocus={() => setIsFocus(true)}
                type="number"
                value={details?.quality}
                onChangeText={e => setValue('quality', e)}
                focusOutlineColor={APP_COLOR}
                keyboardType="numeric"
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Giá</FormControl.Label>
              <Input
                onFocus={() => setIsFocus(true)}
                value={details?.priceItems}
                onChangeText={e => setValue('priceItems', e)}
                type="number"
                focusOutlineColor={APP_COLOR}
                keyboardType="numeric"
              />
            </FormControl>
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
