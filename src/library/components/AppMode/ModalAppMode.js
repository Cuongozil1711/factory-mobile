import React, {
  memo,
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {equals} from 'ramda';
import Modal from 'react-native-modal';
import {Block} from '../Block/Block';
import {useDispatch} from 'react-redux';
import {APP_MODE} from '../../networking';
import {setUrl} from '../../../screen/unAuthorize/login/redux/appReducers';
import {Button} from 'native-base';
import {CustomText} from '../text/CustomText';
import {saveString} from '../../../until/storage';

const ButtonMode = ({onPress, mode}) => {
  const _onSetDev = () => {
    if (typeof onPress === 'function') {
      onPress(mode);
    }
  };
  return (
    <TouchableOpacity onPress={_onSetDev} style={[styles.button]}>
      <CustomText>{mode ?? ''}</CustomText>
    </TouchableOpacity>
  );
};

const ModalAppModeComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    show: isRelease => {
      setIsVisible(true);
      setIsRelease(isRelease);
    },
  }));
  const dispatch = useDispatch();
  const [isRelease, setIsRelease] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const _hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);
  const _onSetAppMode = useCallback(
    async mode => {
      // await saveString(R.strings.APP_MODE, mode);
      // dispatch(onSetAppMode(mode));
      dispatch(setUrl(mode));
      saveString('url', mode);
      _hideModal();
    },
    [_hideModal, dispatch],
  );
  return (
    <Modal
      style={[styles.modal]}
      onBackButtonPress={_hideModal}
      useNativeDriver={true}
      onBackdropPress={_hideModal}
      isVisible={isVisible}>
      <Block block justifyContent={'flex-end'}>
        <Block color={'#FFFFFF'} paddingVertical={10}>
          <ButtonMode onPress={_onSetAppMode} mode={APP_MODE.API_URL_DEV} />
          <ButtonMode onPress={_onSetAppMode} mode={APP_MODE.API_URL_COMPANY} />
          <ButtonMode onPress={_onSetAppMode} mode={APP_MODE.API_URL_1} />
          <ButtonMode onPress={_onSetAppMode} mode={APP_MODE.API_URL_2} />
          <ButtonMode onPress={_onSetAppMode} mode={APP_MODE.API_URL_3} />
        </Block>
      </Block>
    </Modal>
  );
});

export const ModalAppMode = memo(
  ModalAppModeComponent,
  (prevProps, nextProps) => equals(prevProps, nextProps),
);

const styles = StyleSheet.create({
  modal: {
    marginVertical: 0,
    marginHorizontal: 0,
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 0,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
    color: '#333',
  },
});
