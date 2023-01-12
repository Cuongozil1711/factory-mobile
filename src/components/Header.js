import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
  Keyboard,
  BackHandler,
  StatusBar,
} from 'react-native';

import {Icon} from 'native-base';
import {MaterialCommunityIcons} from '@native-base/icons';
import {Colors, Dimensions} from '../theme/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {APP_COLOR} from '../config';

const {STATUS_HEIGHT, HEADER_HEIGHT, DEVICE_WIDTH, HEADER_STATUS_HEIGHT} =
  Dimensions;
const Header = ({
  title,
  leftIcon,
  rightIcon,
  navigation,
  iconApp,
  onChangeText,
}) => {
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showInput, setShowInput] = useState(false);

  let inputViewWidth = useMemo(() => new Animated.Value(0), []);

  const toggleSearchInput = () => {
    if (isShowSearch) {
      Keyboard.dismiss();
      hiddenSearchField();
      setShowInput(false);
    } else {
      showSearchField();
      setShowInput(true);
    }
    setIsShowSearch(!isShowSearch);
  };

  const showSearchField = () => {
    Animated.timing(inputViewWidth, {
      toValue: DEVICE_WIDTH - 100,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const opacityTitle = useMemo(
    () =>
      inputViewWidth.interpolate({
        inputRange: [0, 80],
        outputRange: [1, 40],
      }),
    [inputViewWidth],
  );

  const opacityInput = useMemo(
    () =>
      inputViewWidth.interpolate({
        inputRange: [0, 40],
        outputRange: [0, 1],
      }),
    [inputViewWidth],
  );

  const backAction = () => {
    // dispatch(onTurnOffCameraState(false));
    ////console.log(57);
    navigation.goBack();
    // navigate(APP_SCREEN.AUTHORIZE.HOME);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  useEffect(() => {
    return () => backHandler.remove();
  });

  const hiddenSearchField = () => {
    setSearchText('');
    onChangeText?.('');
    Animated.timing(inputViewWidth, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handelChangeText = useCallback(
    text => {
      setSearchText(text);
      onChangeText?.(text);
    },
    [onChangeText],
  );

  return (
    <View style={styles.containView}>
      <StatusBar
        animated={true}
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        {iconApp ? (
          <View style={styles.headerIconStyle}>
            {!leftIcon && (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => backAction()}
                style={styles.headerBackStyle}>
                <Icon
                  color={Colors.zojoy.colorPrimary}
                  size={6}
                  as={FontAwesome}
                  name="arrow-left"
                />
              </TouchableOpacity>
            )}
            {!showInput && <Text style={styles.headerText}>{title}</Text>}
          </View>
        ) : (
          <Animated.View style={[styles.titleView]}>
            <Text style={styles.title} numberOfLines={1}>
              Smart{''}
              <Text style={styles.title1} numberOfLines={1}>
                Shop
              </Text>
            </Text>
          </Animated.View>
        )}
        {rightIcon ? (
          !isShowSearch ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={toggleSearchInput}
              style={styles.headerRight}>
              <Icon
                as={MaterialCommunityIcons}
                color="#000000"
                name="magnify"
                size={8}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleSearchInput}
              style={styles.headerRight}>
              <Text style={styles.cancelSearch}>Huỷ</Text>
            </TouchableOpacity>
          )
        ) : (
          <View style={styles.view} />
        )}
      </View>
      <Animated.View
        style={[
          styles.absoluteView,
          {width: inputViewWidth, opacity: opacityInput},
        ]}>
        <View style={styles.containSearch}>
          <TextInput
            style={styles.inputSearch}
            onChangeText={handelChangeText}
            placeholder="Tìm kiếm theo tên hoặc mã"
            value={searchText}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#3333"
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  containView: {
    position: 'relative',
  },
  container: {
    backgroundColor: '#ffffff',
    height: HEADER_STATUS_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: STATUS_HEIGHT,
  },
  title: {
    fontSize: 27,
    fontWeight: '400',
    color: 'rgb(75,83,89)',
    textShadowColor: 'rgb(0,0,0)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  title1: {
    fontSize: 27,
    fontWeight: '600',
    color: 'rgb(0,74,173)',
    textShadowColor: 'rgb(0,0,0)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  titleView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  iconAppView: {
    flex: 1,
  },
  iconApp: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  headerBackStyle: {
    marginHorizontal: 3,
    paddingVertical: 5,
    paddingRight: 5,
  },
  headerIconStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  searchIconStyle: {
    width: 24,
    height: 24,
    tintColor: Colors.black,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    fontSize: 22,
  },
  backIconStyle: {
    height: 24,
    width: 24,
    tintColor: Colors.black,
  },
  view: {
    flex: 1,
  },
  absoluteView: {
    position: 'absolute',
    right: 50,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
  },
  inputSearch: {
    width: '100%',
    borderWidth: 1.5,
    backgroundColor: Colors.white,
    borderRadius: 15,
    height: 36,
    borderColor: '#3333',
  },
  containSearch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelSearch: {
    fontSize: 16,
    color: Colors.zojoy.colorPrimary,
  },
  headerText: {
    fontWeight: '500',
    fontSize: 22,
    color: Colors.zojoy.colorPrimary,
  },
});
