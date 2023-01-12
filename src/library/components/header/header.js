import * as React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {Icon} from '../icon/icon';
import {mergeAll, flatten} from 'ramda';
import {SpacingDefault} from '../../../theme/index';
import {useSafeArea} from 'react-native-safe-area-view';
import {translate} from '../../../common/i18n/translate';

const styles = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const inset = useSafeArea();
  return StyleSheet.create({
    ROOT: {
      flexDirection: 'row',
      paddingHorizontal: SpacingDefault.tiny,
      alignItems: 'center',
      paddingTop: inset.top + SpacingDefault.tiny,
      paddingBottom: SpacingDefault.small,
      justifyContent: 'flex-start',
    },
    TITLE: {
      textAlign: 'center',
    },
    TITLE_MIDDLE: {
      flex: 1,
      justifyContent: 'center',
    },
    LEFT: {
      width: 32,
    },
    RIGHT: {
      width: 32,
    },
    WRAP_ICON: {
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
  });
};

export const Header = ({
  onLeftPress = null,
  onRightPress = null,
  rightIcon = null,
  leftIcon = null,
  headerText = null,
  headerTx = null,
  style = null,
  titleStyle = null,
  childrenLeft = null,
  childrenRight = null,
  styleLeft = null,
  styleRight = null,
  dependency = [],
}) => {
  const header = headerText || (headerTx && translate(headerTx)) || '';
  const wrapStyle = mergeAll(flatten([styles().ROOT, style]));
  const title = mergeAll(flatten([styles().TITLE, titleStyle]));
  const LEFT = mergeAll(flatten([styles().WRAP_ICON, styleLeft]));
  const RIGHT = mergeAll(flatten([styles().WRAP_ICON, styleRight]));
  const viewLeft = styles().LEFT;
  const viewMiddle = styles().TITLE_MIDDLE;
  const viewRight = styles().RIGHT;
  const dependencyList = [wrapStyle, title, LEFT, RIGHT, ...dependency];
  return React.useMemo(
    () => (
      <View style={wrapStyle}>
        {leftIcon ? (
          <Button style={LEFT} preset="link" onPress={onLeftPress}>
            <Icon dependency={[]} icon={leftIcon} />
          </Button>
        ) : childrenLeft ? (
          {childrenLeft}
        ) : (
          <View style={viewLeft} />
        )}
        <View style={viewMiddle}>
          <Text style={title} text={header} />
        </View>
        {rightIcon ? (
          <Button style={RIGHT} preset="link" onPress={onRightPress}>
            <Icon icon={rightIcon} />
          </Button>
        ) : childrenRight ? (
          {childrenRight}
        ) : (
          <View style={viewRight} />
        )}
      </View>
    ),
    dependencyList,
  );
};
