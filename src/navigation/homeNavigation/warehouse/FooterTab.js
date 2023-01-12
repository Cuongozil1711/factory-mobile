import React from 'react';
import {APP_SCREEN} from '../../../common/screenType';
import {Home} from '../../../screen/authorize/home/bottomHome/home';
import {Profile} from '../../../screen/authorize/home/bottomHome/profile';
import {OrderShop} from '../../../screen/authorize/home/bottomHome/bookHotel';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Item} from '../../../screen/authorize/home/bottomHome/item';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Manager} from '../../../screen/authorize/home/bottomHome/manager';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {getRole} from '../../../screen/unAuthorize/login/redux/appReducers';
const Tab = createBottomTabNavigator();

export const FooterTabScreen = () => {
  const ItemStack = createNativeStackNavigator();
  const role = useSelector(getRole);

  function ItemStackScreen() {
    return (
      <ItemStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <ItemStack.Screen
          options={{
            gestureEnabled: false,
            headerMode: 'none',
          }}
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.ITEM.ITEM_HOME}
          component={Item}
        />
      </ItemStack.Navigator>
    );
  }

  if (role === 'ROLE_E') {
    return (
      <Tab.Navigator
        initialRouteName={APP_SCREEN.HOME.FOOTER_BOTTOM.HOME}
        activeColor="rgb(0,74,173)"
        inactiveColor="#495057"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: 'rgb(0,74,173)',
          tabBarInactiveTintColor: '#495057',
          tabBarLabelStyle: {
            fontSize: 13,
          },
        })}>
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.HOME}
          options={{
            tabBarLabel: 'Tổng quan',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                size={5}
                as={FontAwesome}
                name="home"
              />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.ORDER_SHOP}
          component={OrderShop}
          options={{
            tabBarLabel: 'Đơn hàng',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="shopping-basket"
              />
            ),
          }}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.TAB_ITEM}
          component={Item}
          options={{
            tabBarLabel: 'Sản phẩm',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="object-group"
              />
            ),
          }}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.PROFILE}
          component={Profile}
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="user"
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else if (role === 'ROLE_A' || role === 'ROLE_S') {
    return (
      <Tab.Navigator
        initialRouteName={APP_SCREEN.HOME.FOOTER_BOTTOM.HOME}
        activeColor="rgb(0,74,173)"
        inactiveColor="#495057"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: 'rgb(0,74,173)',
          tabBarInactiveTintColor: '#495057',
          tabBarLabelStyle: {
            fontSize: 13,
          },
        })}>
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.HOME}
          options={{
            tabBarLabel: 'Tổng quan',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                size={5}
                as={FontAwesome}
                name="home"
              />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.ORDER_SHOP}
          component={OrderShop}
          options={{
            tabBarLabel: 'Đơn hàng',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="shopping-basket"
              />
            ),
          }}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.WARE_HOUSE}
          component={Manager}
          options={{
            tabBarLabel: 'Quản lý',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="eercast"
              />
            ),
          }}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.TAB_ITEM}
          component={Item}
          options={{
            tabBarLabel: 'Sản phẩm',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="object-group"
              />
            ),
          }}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.PROFILE}
          component={Profile}
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="user"
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else if (role === 'ROLE_K') {
    return (
      <Tab.Navigator
        initialRouteName={APP_SCREEN.HOME.FOOTER_BOTTOM.HOME}
        activeColor="rgb(0,74,173)"
        inactiveColor="#495057"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: 'rgb(0,74,173)',
          tabBarInactiveTintColor: '#495057',
          tabBarLabelStyle: {
            fontSize: 13,
          },
        })}>
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.HOME}
          options={{
            tabBarLabel: 'Tổng quan',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                size={5}
                as={FontAwesome}
                name="home"
              />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.WARE_HOUSE}
          component={Manager}
          options={{
            tabBarLabel: 'Quản lý',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="eercast"
              />
            ),
          }}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.TAB_ITEM}
          component={Item}
          options={{
            tabBarLabel: 'Sản phẩm',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="object-group"
              />
            ),
          }}
        />
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.PROFILE}
          component={Profile}
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                size={5}
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                as={FontAwesome}
                name="user"
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator
        initialRouteName={APP_SCREEN.HOME.FOOTER_BOTTOM.HOME}
        activeColor="rgb(0,74,173)"
        inactiveColor="#495057"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: 'rgb(0,74,173)',
          tabBarInactiveTintColor: '#495057',
          tabBarLabelStyle: {
            fontSize: 13,
          },
        })}>
        <Tab.Screen
          name={APP_SCREEN.HOME.FOOTER_BOTTOM.HOME}
          options={{
            tabBarLabel: 'Tổng quan',
            tabBarIcon: ({tintColor, focused}) => (
              <Icon
                color={!focused ? '#495057' : 'rgb(0,74,173)'}
                size={5}
                as={FontAwesome}
                name="home"
              />
            ),
          }}
          component={Home}
        />
      </Tab.Navigator>
    );
  }
};
