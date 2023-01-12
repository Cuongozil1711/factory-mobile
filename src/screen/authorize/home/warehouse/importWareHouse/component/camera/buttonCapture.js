import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from '../../../../../../../library/components/button/button';

const SIZE_BUTTON = 60;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignSelf: 'center',
  },
  content: {
    width: SIZE_BUTTON,
    height: SIZE_BUTTON,
    borderRadius: SIZE_BUTTON / 2,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    backgroundColor: '#FFFFFF',
  },
  textCapture: {
    color: '#000',
  },
});

export const ButtonCapture = ({onPress}) => {
  const inset = useSafeArea();
  return (
    <TouchableOpacity
      style={[styles.button, {bottom: inset.bottom + 10}]}
      onPress={onPress}
      preset={'link'}>
      <View style={[styles.content]}>
        <Ionicons size={32} name={'add-circle'} />
      </View>
    </TouchableOpacity>
  );
};
