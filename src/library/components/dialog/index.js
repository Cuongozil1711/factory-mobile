import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, Dimensions, View, Text, Modal} from 'react-native';
import {ButtonDialog} from './buttonDialog';
import {useDispatch} from 'react-redux';
const {} = Dimensions.get('window');

export const styles = StyleSheet.create({
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

export const Dialog = forwardRef((props, ref) => {
  // ////console.log(ref);
  useImperativeHandle(ref, () => ({
    show: (message, data, title, isOut = false) => {
      setMsg(message);
      setDataMsg(data);
      setTitle(title);
      setVisible(true);
      setRunLogout(isOut);
    },
  }));
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const [title, setTitle] = useState('');
  const [dataMsg, setDataMsg] = useState([]);
  const [visible, setVisible] = useState(false);
  const [runLogout, setRunLogout] = useState(false);
  const _onModalClose = () => {
    setMsg('');
    setTitle('');
    setDataMsg([]);
    setRunLogout(false);
  };
  const onBackDropPress = () => {
    if (dataMsg.length === 0) {
      setVisible(false);
    }
  };
  const onButtonPress = onPress => {
    setVisible(false);
    onPress && onPress();
    if (runLogout) {
      // dispatch(onLogout());
    }
  };
  return (
    <Modal
      style={[styles.modal]}
      isVisible={visible}
      useNativeDriver={true}
      onModalHide={_onModalClose}
      onBackdropPress={onBackDropPress}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropOpacity={0.4}
      animationOutTiming={20}
      animationInTiming={20}>
      <View style={[styles.wrapDialog]}>
        <Text style={[styles.textTitle]} text={title} />
        <Text style={[styles.textMsg]} text={msg} />
        {visible && (
          <View style={[styles.rowButton]}>
            {dataMsg.map((item, index) => (
              <>
                <ButtonDialog
                  key={item.text + index}
                  onPress={item.onPress}
                  text={item.text}
                  onParentPress={onButtonPress}
                />
                {index < dataMsg.length - 1 && dataMsg.length > 1 && (
                  <View
                    key={item.text + index + 1}
                    style={[styles.viewSpace]}
                  />
                )}
              </>
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
});
