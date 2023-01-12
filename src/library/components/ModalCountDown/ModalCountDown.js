import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  memo,
  useEffect,
  useCallback,
} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {ButtonDialog} from './ButtonDialog';
import {useInterval} from 'appCommon';
import {equals} from 'ramda';
import {SizeBox} from '../SizeBox/SizeBox';
import {translate} from '../../../common/i18n/translate';

const styles = StyleSheet.create({
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
});

const ModalCountdownComponent = ({
  txMsg,
  onPressCountdown,
  onPressCancel,
  txTitle,
  isVisible = false,
  time = 10,
}) => {
  const [visible, setVisible] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const _onCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  const onButtonCancelPress = () => {
    _onCloseModal();
    if (typeof onPressCancel === 'function') {
      onPressCancel && onPressCancel();
    }
  };
  const _onButtonCountdownPress = () => {
    _onCloseModal();
    if (typeof onPressCountdown === 'function') {
      onPressCountdown && onPressCountdown();
    }
  };
  useInterval(() => {
    if (countDown > 0) {
      setCountDown(cd => cd - 1);
    } else {
      if (visible) {
        _onButtonCountdownPress();
      }
    }
  }, 1000);
  useEffect(() => {
    setVisible(isVisible === true);
  }, [isVisible]);
  useEffect(() => {
    if (visible) {
      setCountDown(time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  return (
    <Modal
      style={[styles.modal]}
      isVisible={visible}
      useNativeDriver={true}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropOpacity={0.4}
      animationOutTiming={20}
      animationInTiming={20}>
      <View style={[styles.wrapDialog]}>
        <Text style={[styles.textTitle]} tx={txTitle} />
        <Text style={[styles.textMsg]} tx={txMsg} />
      </View>
    </Modal>
  );
};
export const ModalCountdown = memo(ModalCountdownComponent, equals);
