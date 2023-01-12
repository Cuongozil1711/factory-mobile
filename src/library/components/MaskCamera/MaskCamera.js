import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Block} from '../Block/Block';
import {Icon} from '../icon/icon';
import {Divider} from '../divider';
import {SizeBox} from '../SizeBox/SizeBox';
import {scale} from '../../../common/scale';

const styles = StyleSheet.create({
  icon: {
    tintColor: '#FFFFFF',
  },
  text: {
    color: '#FFFFFF',
  },
});

const MaskCameraComponent = ({width = 0, height = 0}) => {
  return (
    <Block
      border
      borderColor={'#FFFFFF'}
      borderWidth={2}
      alignSelf={'center'}
      justifyContent={'flex-end'}
      alignItems={'center'}
      marginTop={scale(20)}
      width={width}
      height={height}>
      <Icon icon={'arrow_down'} style={[styles.icon]} />
      <SizeBox height={2} />
      <Divider height={2} backgroundColor={'#f1c40f'} />
      <Text style={[styles.text]} tx={'main:txBottomLabel'} />
    </Block>
  );
};

export const MaskCamera = memo(MaskCameraComponent);
