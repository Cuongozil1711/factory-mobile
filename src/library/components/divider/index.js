import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
});
export const Divider = ({
  height = StyleSheet.hairlineWidth,
  backgroundColor = '#bbb',
}) => {
  return useMemo(
    () => <View style={[styles.wrap, {height, backgroundColor}]} />,
    [height, backgroundColor],
  );
};
