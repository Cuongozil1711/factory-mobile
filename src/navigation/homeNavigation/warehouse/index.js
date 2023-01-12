import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {APP_SCREEN} from '../../../common/screenType';
import {Login} from '../../../screen/unAuthorize/login';
import {Register} from '../../../screen/unAuthorize/register';
import {OtpScreen} from '../../../screen/unAuthorize/otp';
const HomeStack = createStackNavigator();

export const HomeHouseScreen = ({route}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerMode: 'none',
        cardShadowEnabled: true,
      }}
      initialRouteName={APP_SCREEN.HOME.HOME_APP}>
      <HomeStack.Screen
        options={{
          gestureEnabled: false,
          headerMode: 'none',
        }}
        name={APP_SCREEN.HOME.HOME_APP}
        component={Login}
      />
      <HomeStack.Screen
        options={{gestureEnabled: false}}
        name={APP_SCREEN.UN_AUTHORIZE.REGISTER}
        component={Register}
      />
      <HomeStack.Screen
        options={{gestureEnabled: false}}
        name={APP_SCREEN.UN_AUTHORIZE.OTP}
        component={OtpScreen}
      />
    </HomeStack.Navigator>
  );
};
