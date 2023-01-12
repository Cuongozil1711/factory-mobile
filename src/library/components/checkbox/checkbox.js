import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {mergeAll, flatten} from 'ramda';
import {SpacingDefault, ColorDefault} from '../../../theme';
const DIMENSIONS = {width: 16, height: 16};
const styles = StyleSheet.create({
  ROOT: {
    flexDirection: 'row',
    paddingVertical: SpacingDefault.tiny,
    alignSelf: 'flex-start',
  },
  OUTLINE: {
    ...DIMENSIONS,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ColorDefault.primaryDarker,
    borderRadius: 1,
  },
  FILL: {
    width: DIMENSIONS.width - 4,
    height: DIMENSIONS.height - 4,
    backgroundColor: ColorDefault.primary,
  },
  LABEL: {
    paddingLeft: SpacingDefault.smaller,
  },
});

export function Checkbox({
  style = null,
  outlineStyle = null,
  fillStyle = null,
  value = false,
  text = null,
  tx = null,
  multiline = false,
  dependency = [],
  onToggle = null,
}) {
  const numberOfLines = multiline ? 0 : 1;

  const rootStyle = mergeAll(flatten([styles.ROOT, style]));
  const outline = mergeAll(flatten([styles.OUTLINE, outlineStyle]));
  const fill = mergeAll(flatten([styles.FILL, fillStyle]));
  const labelStyle = styles.LABEL;
  const onPress = onToggle ? () => onToggle && onToggle(!value) : null;
  const dependencyList = [
    rootStyle,
    outlineStyle,
    fillStyle,
    ...(dependency = []),
  ];
  return React.useMemo(
    () => (
      <>
        <View style={outline}>{value && <View style={fill} />}</View>
      </>
    ),
    dependencyList,
  );
}
