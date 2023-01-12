import {StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'native-base';
export const CustomText = props => {
  return (
    <Text style={[styles.defaultStyle, props.style]} fontStyle="italic">
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    color: '#495057',
  },
});
