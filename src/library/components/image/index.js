import * as React from 'react';
import {View, Image} from 'react-native';
import {R} from '../../../assets/value';
const ROOT = {
  resizeMode: 'contain',
};
export function Img(props) {
  const {style: styleOverride, source, containerStyle} = props;
  const style = {...ROOT, ...styleOverride};
  return (
    <View style={containerStyle}>
      <Image style={style} source={R.images[source]} />
    </View>
  );
}
