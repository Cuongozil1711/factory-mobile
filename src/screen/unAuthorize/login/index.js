import React, {useEffect, useState, useRef} from 'react';
import {
  Box,
  Text,
  VStack,
  FormControl,
  Image,
  Input,
  Button,
  HStack,
  Center,
} from 'native-base';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {API_URL_DEV, VERSION_APP} from '../../../library/networking';
import {useDispatch, useSelector} from 'react-redux';
import {dvtCodeApi, loginApi} from './redux/loginApi';
import {APP_COLOR} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUrl, setUrl} from './redux/appReducers';
import {ModalAppMode} from '../../../library/components/AppMode/ModalAppMode';
export function Login() {
  const dispatch = useDispatch();
  const img = require('../../../assets/logo.png');
  const url = useSelector(getUrl);
  const _modalAppMode = useRef();
  const [user, setUser] = useState({
    username: 'cuongnv',
    password: '12345678',
  });

  useEffect(() => {
    dispatch(setUrl(API_URL_DEV));
    dispatch(dvtCodeApi());
  }, []);

  const readDataToken = async () => {
    try {
      const value = await AsyncStorage.getItem('tokenFirebase');
      return value;
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  const goHome = async () => {
    const tokenFirebase = await readDataToken();
    //console.log('tokenFirebase' + tokenFirebase);
    if (user?.username && user?.password) {
      dispatch(
        loginApi({
          ...user,
          tokenFirebase: tokenFirebase,
        }),
      );
    }
  };

  const changeUrl = () => {
    _modalAppMode.current.show();
  };

  const handleChange = (field, value) => {
    switch (field) {
      case 'username':
        setUser({...user, username: value});
        break;
      case 'password':
        setUser({...user, password: value});
        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaView flex={1}>
      <ModalAppMode ref={_modalAppMode} />
      <Center flex={1} backgroundColor="#FFFF">
        <Center w="100%">
          <Box safeArea p="0" py="6" w="90%" maxW="300">
            <HStack mt="8" justifyContent="center">
              <Image source={img} size="xl" />
            </HStack>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input
                  type="username"
                  value={user?.username}
                  onChangeText={e => handleChange('username', e)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Mật khẩu</FormControl.Label>
                <Input
                  type="password"
                  value={user?.password}
                  onChangeText={e => handleChange('password', e)}
                />
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={goHome}>
                Đăng nhập
              </Button>
              <HStack mt="16" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  {VERSION_APP}
                </Text>
              </HStack>
              <HStack justifyContent="center">
                <TouchableOpacity
                  onPress={() => changeUrl()}
                  fontSize="sm"
                  color={APP_COLOR}
                  _dark={{
                    color: APP_COLOR,
                  }}>
                  <Text>{url}</Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </Center>
    </SafeAreaView>
  );
}
