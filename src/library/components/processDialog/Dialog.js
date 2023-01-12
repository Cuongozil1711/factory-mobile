import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
  useCallback,
} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import {Block} from '../Block/Block';
import {SizeBox} from '../SizeBox/SizeBox';
import Icon from 'react-native-vector-icons/Ionicons';
import {APP_COLOR} from '../../../config';

const styles = StyleSheet.create({
  modal: {
    marginVertical: 0,
    marginHorizontal: 0,
  },
  textLoading: {
    flex: 1,
  },
});

function Dialog(props, ref) {
  const [visible, setVisible] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const callbackClose = useRef(null);
  const [initMsg, setMsg] = useState();
  useImperativeHandle(ref, () => ({
    show: (msg, callback) => {
      setMsg(msg);
      setVisible(true);
      if (typeof callback === 'function') {
        setShowClose(true);
        callbackClose.current = callback;
      }
    },
    hidden: () => {
      setVisible(false);
    },
  }));
  const _onClose = () => {
    if (typeof callbackClose.current === 'function') {
      callbackClose.current();
      callbackClose.current = null;
    }
  };
  const _onModalHide = useCallback(() => {
    callbackClose.current = null;
    setShowClose(false);
  }, []);
  return (
    <View>
      <Modal
        style={[styles.modal]}
        isVisible={visible}
        onModalWillHide={_onModalHide}
        animationType="fade"
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.4}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}>
        <Block block justifyContent={'flex-end'}>
          <Block
            middle
            direction={'row'}
            color={'#FFFFFF'}
            paddingVertical={15}
            paddingHorizontal={10}
            borderRadius={5}
            marginLeft={20}
            marginRight={20}
            marginBottom={15}>
            <ActivityIndicator size={'large'} color={APP_COLOR} />
            <SizeBox width={10} />
            <Text style={[styles.textLoading]}>{initMsg}</Text>
            {showClose === true && (
              <Button onPress={_onClose} preset={'link'}>
                <Block paddingHorizontal={5} paddingVertical={5} middle>
                  <Icon name={'ios-close-circle-outline'} size={32} />
                </Block>
              </Button>
            )}
          </Block>
        </Block>
      </Modal>
    </View>
  );
}

export default Dialog = forwardRef(Dialog);
