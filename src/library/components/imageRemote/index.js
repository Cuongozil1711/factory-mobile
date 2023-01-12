import React, {useState, useEffect} from 'react';
import {Image, View} from 'react-native';
import {mergeAll, flatten} from 'ramda';
const BASE = {
  width: 24,
  height: 24,
  resizeMode: 'contain',
};
const BASE_DEFAULT = {
  tintColor: '#3D3D3D',
  resizeMode: 'cover',
};
export function ImageRemote({source, style: styleOverride, styleDefault}) {
  const [url, setUrl] = useState('');
  const imageStyle = mergeAll(flatten([BASE, styleOverride]));
  const checkUrlImage = () => {
    fetch(source)
      .then(res => {
        if (res.status === 200) {
          setUrl(source);
        }
      })
      .catch(() => {
        setUrl('');
      });
  };
  useEffect(() => {
    checkUrlImage();
  }, [source]);
  return url !== '' ? (
    <Image source={{uri: url}} style={imageStyle} />
  ) : (
    <View />
  );
}
