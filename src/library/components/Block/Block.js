import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {mergeAll, flatten, equals} from 'ramda';

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

const BlockComponent = ({
  block,
  flex,
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  direction,
  padding,
  paddingHorizontal,
  paddingVertical,
  width,
  height,
  border,
  borderWidth,
  borderColor,
  color,
  justifyContent,
  alignSelf,
  middle,
  borderRadius,
  shadow,
  alignItems,
  paddingLeft,
  paddingRight,
  backgroundColor,
  style = {},
  children,
  ...rest
}) => {
  const styleComponent = [
    block && styles.block,
    margin && {margin},
    flex && {flex},
    marginLeft && {marginLeft},
    marginRight && {marginRight},
    alignSelf && {alignSelf},
    marginTop && {marginTop},
    marginBottom && {marginBottom},
    direction && {flexDirection: direction},
    padding && {padding},
    paddingLeft && {paddingLeft},
    paddingRight && {paddingRight},
    paddingHorizontal && {paddingHorizontal},
    paddingVertical && {paddingVertical},
    width && {width},
    height && {height},
    border && {borderWidth: 1, borderColor: 'gray'},
    borderWidth && {borderWidth},
    borderColor && {borderColor},
    color && {backgroundColor: color},
    justifyContent && {justifyContent},
    alignItems && {alignItems},
    middle && {alignItems: 'center'},
    borderRadius && {borderRadius},
    backgroundColor && {backgroundColor},
    shadow && {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 3,
    },
    mergeAll(flatten([style])),
  ];
  return (
    <View style={styleComponent} {...rest}>
      {children}
    </View>
  );
};
export const Block = memo(BlockComponent, (prevProps, nextProps) =>
  equals(prevProps, nextProps),
);
