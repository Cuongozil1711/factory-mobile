import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Button, Input} from 'native-base';
import {StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import {APP_SCREEN} from '../../../common/screenType';
import Header from '../../../components/Header';

export function OtpScreen() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const goHome = () => {
    navigation.navigate(APP_SCREEN.HOME.BOTTOM_HOME);
  };
  const [otpToken, setOtpToken] = useState('');
  const handleChangeOtpToken = text => setOtpToken(text);

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
                <Text style={styles.textContent}>
                  Mã xác thực đang được gửi đến số điện thoại
                </Text>
                <Text style={styles.textContent}>(+84) 974886013</Text>
              </View>
              <Input
                w={{
                  base: '90%',
                  md: '15%',
                }}
                h="14%"
                borderColor={'#FFBB86'}
                maxLength={50}
                variant="rounded"
                value={otpToken}
                onChangeText={handleChangeOtpToken}
                placeholder="OTP"
              />
            </View>
            <View style={styles.bottomView}>
              <View style={styles.buttonLogin}>
                <Button
                  borderRadius={15}
                  onPress={goHome}
                  style={styles.buttonRegister}>
                  <Text>TIẾP THEO</Text>
                </Button>
              </View>
              <View style={styles.quickLogin}>
                <Text>Vui lòng chờ 60s để nhận được xác thực</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 28,
    marginVertical: 8,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegister: {width: 200, height: 45, backgroundColor: '#FF3700'},
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
