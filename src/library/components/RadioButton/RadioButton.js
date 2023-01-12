import React, {memo, useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import {equals} from 'ramda';
import {Block} from '../Block/Block';
import {SizeBox} from '../SizeBox/SizeBox';
import {APP_COLOR} from '../../../config';

const SIZE_RADIO = 6;

const styles = StyleSheet.create({
  wrapRadio: {
    width: SIZE_RADIO * 2,
    height: SIZE_RADIO * 2,
    borderRadius: SIZE_RADIO,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
  },
  text: {
    textAlignVertical: 'center',
  },
  active: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 2,
    right: 2,
    backgroundColor: APP_COLOR,
    alignSelf: 'center',
    borderRadius: SIZE_RADIO,
  },
});

const RadioButtonComponent = ({
  txTitle,
  txOptions,
  value = false,
  valueToSet,
  setValue,
}) => {
  const _onPress = useCallback(() => {
    if (typeof setValue === 'function' && value === false) {
      setValue(valueToSet);
    }
  }, [setValue, value, valueToSet]);
  return (
    <Block direction={'row'} middle>
      <Block style={[styles.wrapRadio]}>
        <Block style={[value === true && styles.active]} />
      </Block>
      <SizeBox width={3} />
      <Text tx={txTitle} txOptions={txOptions} style={[styles.text]} />
    </Block>
  );
};

export const RadioButton = memo(RadioButtonComponent, equals);
