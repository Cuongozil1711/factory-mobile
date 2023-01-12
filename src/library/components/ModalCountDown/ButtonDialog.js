import React from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import {APP_COLOR} from 'appConfig';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 13,
  },
});

export const ButtonDialog = ({
  onPress,
  text,
  textColor = '#FFFFFF',
  color = APP_COLOR,
}) => {
  const _onPress = () => {
    if (typeof onPress === 'function') {
      onPress && onPress(onPress);
    }
  };
  return (
    <Button
      style={[{backgroundColor: color}]}
      activeOpacity={0.67}
      onPress={_onPress}>
      <Text style={[styles.text, {color: textColor}]} text={text ?? ''} />
    </Button>
  );
};
