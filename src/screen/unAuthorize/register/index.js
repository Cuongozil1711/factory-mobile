import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Button, Input, Link, Icon, Image} from 'native-base';
import {StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import {MaterialCommunityIcons} from '@native-base/icons';
import Header from '../../../components/Header';

export function Register() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [username, setUsername] = useState('');
  const handleChangePhone = text => setPhoneNumbers(text);
  const handleChangeUsername = text => setUsername(text);

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={92}
        source={require('../../../assets/image/imageBackground.png')}
        style={[styles.imageBackground]}>
        <SafeAreaView style={styles.container}>
          <View>
            <Header leftIcon={true} onPressLeftIcon={goBack} />
          </View>
          <View style={styles.session_2}>
            <View style={styles.inputView}>
              <View style={styles.textView}>
                <Text style={styles.greeting}>ZoJoy xin chào !</Text>
                <Text style={styles.textContent}>
                  Đăng ký để nhận ưu đãi độc quyền dành cho thành viên mới
                </Text>
              </View>
              <Input
                w={{
                  base: '90%',
                  md: '15%',
                }}
                h="15%"
                borderColor={'orange.100'}
                InputLeftElement={
                  <Icon
                    as={<MaterialCommunityIcons name="phone" />}
                    size={8}
                    ml="2"
                    color="#FF3700"
                  />
                }
                maxLength={50}
                variant="rounded"
                value={phoneNumbers}
                onChangeText={handleChangePhone}
                placeholder="Số điện thoại"
              />
              <Input
                marginTop={8}
                w={{
                  base: '90%',
                  md: '15%',
                }}
                h="15%"
                borderColor={'orange.100'}
                InputLeftElement={
                  <Icon
                    as={<MaterialCommunityIcons name="account-box" />}
                    size={8}
                    ml="2"
                    color="#FF3700"
                  />
                }
                maxLength={50}
                variant="rounded"
                value={username}
                onChangeText={handleChangeUsername}
                placeholder="Tên của bạn"
              />
            </View>
            <View style={styles.bottomView}>
              <View style={styles.buttonLogin}>
                <Button
                  borderRadius={15}
                  colorScheme="orange"
                  onPress={goBack}
                  style={styles.buttonRegister}>
                  <Text>ĐĂNG KÝ</Text>
                </Button>
              </View>
              <View style={styles.quickLogin}>
                <Text>hoặc đăng nhập nhanh bằng</Text>
                <View style={styles.buttonQuickLogin}>
                  <Button variant="ghost" onPress={goBack}>
                    <Image
                      size={50}
                      borderRadius={100}
                      source={require('../../../assets/image/facebook-icon.png')}
                      alt="Alternate Text"
                      onPress={goBack}
                    />
                  </Button>
                  <Button variant="ghost" onPress={goBack}>
                    <Image
                      size={50}
                      borderRadius={100}
                      source={require('../../../assets/image/google_icon.png')}
                      alt="Alternate Text"
                      onPress={goBack}
                    />
                  </Button>
                </View>
              </View>
              <View style={styles.links}>
                <Text>
                  Bạn chưa có tài khoản ?
                  <Link
                    onPress={goBack}
                    isExternal
                    _text={{
                      color: 'orange.400',
                    }}>
                    Đăng ký ngay.
                  </Link>
                  <Link onPress={goBack}>Bỏ qua.</Link>
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  imageBackground: {flex: 1},
  greeting: {
    fontSize: 26,
    color: '#000000',
    lineHeight: 26,
    fontWeight: 'bold',
  },
  session_2: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  inputView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  textView: {
    margin: 20,
  },
  textContent: {
    fontSize: 20,
    color: '#000000',
    lineHeight: 26,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegister: {width: 200, height: 45},
  buttonLogin: {flex: 1, justifyContent: 'center'},
  quickLogin: {flex: 1},
  buttonQuickLogin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  links: {flex: 1},
});
