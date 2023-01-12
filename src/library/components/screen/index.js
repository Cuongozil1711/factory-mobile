import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export const offsets = {
  none: 0,
};
export const presets = {
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  fixed: {
    outer: {
      backgroundColor: 'transparent',
      flex: 1,
    },
    outer0: {
      flex: 0,
    },
    inner: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: 'transparent',
      flex: 1,
    },
  },

  scroll: {
    outer: {
      backgroundColor: 'transparent',
      flex: 1,
      height: '100%',
    },
    outer0: {
      flex: 0,
    },
    inner: {justifyContent: 'flex-start', alignItems: 'stretch'},
  },
};

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props) {
  const preset = presets['fixed'];
  const style = props.style || {};
  const {
    hidden = false,
    statusColor = undefined,
    draw = false,
    customInsetBottom = false,
    bottomIPX = '#ffffff',
    enabledKeyboard = true,
  } = props;
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const Wrapper = props.unsafe ? View : SafeAreaView;

  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled={true}
      enabled={enabledKeyboard}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[preset.outer]}
      enableOnAndroid={enabledKeyboard}>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={props.statusBar || 'light-content'}
      />
      {draw === false && (
        <SafeAreaView style={[preset.outer0, {backgroundColor: statusColor}]} />
      )}

      <Wrapper
        forceInset={props.forceInset ?? undefined}
        style={[preset.inner, style, backgroundStyle]}>
        {props.children}
      </Wrapper>
      {customInsetBottom === true && (
        <SafeAreaView style={[preset.outer0, {backgroundColor: bottomIPX}]} />
      )}
    </KeyboardAwareScrollView>
  );
}

function ScreenWithScrolling(props) {
  const preset = presets['scroll'];
  const style = props.style || {};
  const {
    showHorizontal = false,
    showVertical = false,
    hidden = false,
    statusColor = undefined,
    draw = false,
    customInsetBottom = false,
    bottomIPX = '#ffffff',
    enabledKeyboard = true,
  } = props;
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const Wrapper = props.unsafe ? View : SafeAreaView;

  return (
    <KeyboardAvoidingView
      style={[preset.outer]}
      enabled={enabledKeyboard}
      nestedScrollEnabled={true}
      keyboardDismissMode={'on-drag'}
      enableOnAndroid={enabledKeyboard}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={props.statusBar || 'light-content'}
      />
      {draw === false && (
        <SafeAreaView style={[preset.outer0, {backgroundColor: statusColor}]} />
      )}
      <Wrapper
        forceInset={props.forceInset ?? {top: 'always'}}
        style={[preset.outer]}>
        <ScrollView
          showsVerticalScrollIndicator={showVertical}
          showsHorizontalScrollIndicator={showHorizontal}
          keyboardShouldPersistTaps="handled"
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}>
          {props.children}
        </ScrollView>
      </Wrapper>
      {customInsetBottom === true && (
        <SafeAreaView style={[preset.outer0, {backgroundColor: bottomIPX}]} />
      )}
    </KeyboardAvoidingView>
  );
}

export function Screen(props) {
  const {isScroll = false} = props;
  if (isScroll) {
    return <ScreenWithScrolling {...props} />;
  } else {
    return <ScreenWithoutScrolling {...props} />;
  }
}
