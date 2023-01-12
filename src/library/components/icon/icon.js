import * as React from 'react';
import {View, Image} from 'react-native';
import {R} from 'assets/value';
import {mergeAll, flatten} from 'ramda';
const ROOT = {
  resizeMode: 'contain',
};

export const Icon = ({
  style: styleOverride = null,
  containerStyle = null,
  icon,
}) => {
  const style = mergeAll(flatten([ROOT, styleOverride]));
  return (
    <View style={containerStyle}>
      <Image style={style} source={R.icons[icon]} />
    </View>
  );
};
