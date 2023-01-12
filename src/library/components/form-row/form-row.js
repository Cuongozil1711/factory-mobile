import * as React from 'react';
import {View} from 'react-native';
import {styles} from './form-row.presets';
import {mergeAll, flatten} from 'ramda';

export const FormRow = props => {
  const {children, style = null, preset = 'soloRound', dependency = []} = props;
  const viewStyle = mergeAll(flatten([styles()[preset], style]));
  const dependencyList = [viewStyle, ...dependency];
  return React.useMemo(
    () => <View style={viewStyle}>{children}</View>,
    dependencyList,
  );
};
