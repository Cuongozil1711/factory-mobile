import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View, Platform, Dimensions} from 'react-native';
import {equals} from 'ramda';
import Animated, {useCode, set, onChange} from 'react-native-reanimated';
import {Keyboard} from 'react-native';
import {useValues, timing} from 'react-native-redash';
import {useWindowDimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
});
// const updateKeyboardSpace = event => {
//   if (!event.endCoordinates) {
//     return;
//   }

//   let animationConfig = defaultAnimation;
//   if (Platform.OS === 'ios') {
//     animationConfig = LayoutAnimation.create(
//       event.duration,
//       LayoutAnimation.Types[event.easing],
//       LayoutAnimation.Properties.opacity,
//     );
//   }
//   LayoutAnimation.configureNext(animationConfig);

//   // get updated on rotation
//   const screenHeight = Dimensions.get('window').height;
//   // when external physical keyboard is connected
//   // event.endCoordinates.height still equals virtual keyboard height
//   // however only the keyboard toolbar is showing if there should be one
//   const keyboardSpace =
//     screenHeight - event.endCoordinates.screenY + this.props.topSpacing;
//   this.setState(
//     {
//       keyboardSpace,
//       isKeyboardOpened: true,
//     },
//     this.props.onToggle(true, keyboardSpace),
//   );
// };
// const resetKeyboardSpace = event => {
//   let animationConfig = defaultAnimation;
//   if (Platform.OS === 'ios') {
//     animationConfig = LayoutAnimation.create(
//       event.duration,
//       LayoutAnimation.Types[event.easing],
//       LayoutAnimation.Properties.opacity,
//     );
//   }
//   LayoutAnimation.configureNext(animationConfig);

//   this.setState(
//     {
//       keyboardSpace: 0,
//       isKeyboardOpened: false,
//     },
//     this.props.onToggle(false, 0),
//   );
// };
const KeyboardSpacerComponent = () => {
  const [height, keyboardHeight] = useValues([0, 0], []);
  const {height: heightWindow} = useWindowDimensions();
  const resetKeyboardSpace = () => {
    keyboardHeight.setValue(0);
  };
  const updateKeyboardSpace = event => {
    if (!event.endCoordinates) {
      return;
    }
    keyboardHeight.setValue(heightWindow - event.endCoordinates.screenY);
  };
  useEffect(() => {
    const updateListener =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    const _listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];
    return () => {
      _listeners.forEach(x => x.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useCode(
    () =>
      onChange(keyboardHeight, [
        set(height, timing({from: height, to: keyboardHeight, duration: 300})),
      ]),
    [keyboardHeight],
  );
  const styleView = [styles.container, {height: height}];
  return <Animated.View style={styleView} />;
};

export const KeyboardSpacer = memo(KeyboardSpacerComponent, equals);
