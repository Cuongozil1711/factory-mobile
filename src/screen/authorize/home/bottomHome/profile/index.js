import {View, Text, Icon} from 'native-base';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, setUser} from './redux/ProfileSlice';
import {getByUser} from './redux/ProfileApi';
import {APP_COLOR} from '../../../../../config';
import {CustomText} from '../../../../../library/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {setToken} from '../../../../unAuthorize/login/redux/appReducers';
import {APP_SCREEN} from '../../../../../common/screenType';

export function Profile(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByUser());
  }, []);
  const userData = useSelector(getUser);
  console.log(userData);
  let url =
    userData?.image ||
    'http://ui-avatars.com/api/?background=random&name=' +
      userData?.fullNameDto?.lastName;
  let name =
    userData?.fullNameDto?.firstName + ' ' + userData?.fullNameDto?.lastName;
  //console.log(name);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={APP_COLOR}
        barStyle="dark-content"
      />
      <View style={styles.header} />
      <Image style={styles.avatar} source={{uri: url}} />
      <TouchableOpacity
        style={styles.edit}
        onPress={() => props.navigation.navigate(APP_SCREEN.HOME.PROFILE_EDIT)}>
        <Icon size={25} as={FontAwesome} color={'red'} name="edit" />
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <CustomText style={styles.name}>{name}</CustomText>
          <CustomText style={styles.info}>{userData?.companyName}</CustomText>
          <CustomText style={styles.info}>
            {userData?.namePosition} - <CustomText>{userData?.tel}</CustomText>
          </CustomText>
          <CustomText>Số cmt: {userData?.cmt}</CustomText>
          <Text style={styles.description}>
            {userData?.addressDto?.name ?? ''}
          </Text>

          <TouchableOpacity style={styles.buttonContainer}>
            <CustomText style={{color: '#FFFFFF'}}>Đổi mật khẩu</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              dispatch(setUser(null));
              dispatch(setToken(null));
            }}>
            <CustomText style={{color: '#FFFFFF'}}>Đăng xuất</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  header: {
    backgroundColor: APP_COLOR,
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  edit: {
    alignSelf: 'center',
    position: 'absolute',
    right: '25%',
    marginTop: 200,
    top: 30,
  },
  name: {
    fontSize: 22,
    color: APP_COLOR,
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: 'center',
    padding: 30,
  },
  // name: {
  //   fontSize: 28,
  //   color: '#696969',
  //   fontWeight: '600',
  // },
  info: {
    fontSize: 16,
    color: APP_COLOR,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: APP_COLOR,
  },
});
