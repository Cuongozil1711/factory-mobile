import React from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import {APP_COLOR} from 'appConfig';

const styles = StyleSheet.create({
  button: {
    backgroundColor: APP_COLOR,
    borderRadius: 5,
    flex: 1,
    paddingVertical: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 13,
  },
});

export const ButtonDialog = ({onPress, onParentPress, text}) => {
  const _onPress = () => {
    onParentPress && onParentPress(onPress);
  };
  return (
    <Button style={[styles.button]} activeOpacity={0.67} onPress={_onPress}>
      title={text ?? 'Ok'}
    </Button>
  );
};
