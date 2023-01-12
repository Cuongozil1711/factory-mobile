import React, {
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import {Modal, Radio, FormControl, Input, Image} from 'native-base';
import {Select, Center, CheckIcon, WarningOutlineIcon} from 'native-base';
import {StyleSheet} from 'react-native';
export const ModalViewImage = forwardRef((props, ref) => {
  const [defaultData, setDetault] = useState();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [data, setData] = useState({
    idReceiptImport: null,
  });
  useImperativeHandle(ref, () => ({
    show: (onChange, times) => {
      //console.log(times);
      setDetault(times);
      _callback.current = onChange;
      setIsVisible(true);
    },
  }));
  const _callback = useRef(null);

  const _hideModal = useCallback(() => {
    setIsVisible(false);
    _callback.current = null;
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
      <Modal.Content
        style={{width: '100%', height: '100%', marginHorizontal: 10}}>
        <Modal.CloseButton />
        <Modal.Header>Ảnh phiếu nhập</Modal.Header>
        <Modal.Body>
          <Center>
            <Image
              source={{
                uri: defaultData,
              }}
              resizeMode="cover"
              style={{
                alignItems: 'center',
                marginVertical: 10,
                width: 400,
                height: 450,
              }}
              alt="item"
              size="2xl"
            />
          </Center>
        </Modal.Body>

        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
});

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  imgPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
