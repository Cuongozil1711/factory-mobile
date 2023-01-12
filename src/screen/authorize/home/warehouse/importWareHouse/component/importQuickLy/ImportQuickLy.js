import * as React from 'react';
import {Divider, Icon, Radio, Stack, Text, View} from 'native-base';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {APP_SCREEN} from '../../../../../../../common/screenType';
import {APP_COLOR} from '../../../../../../../config';
import {translate} from '../../../../../../../common/i18n/translate';
import Header from '../../../../../../../components/Header';
export function ImportQuickLy(props) {
  const dispatch = useDispatch();
  const IsFocused = useIsFocused();

  useEffect(() => {}, [IsFocused, dispatch]);

  const createQuickLy = () => {
    props.navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.CAMERA_QUICKLY);
  };

  const createOcrDetect = () => {
    props.navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.CAMERA_OCR);
  };

  const [value, setValue] = React.useState('one');

  const _listHeaderComponent = () => (
    <View style={[styles.wrapHeader]}>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginLeft: 5,
        }}
        onPress={() => createQuickLy()}>
        <Icon size={6} as={FontAwesome} name="camera" color={APP_COLOR} />
        <Text style={[styles.textHeader, {marginRight: 3}]}>
          {translate('ctp:importWareHouse:quickLy')}
        </Text>
      </TouchableOpacity>

      {/*<TouchableOpacity*/}
      {/*  style={{*/}
      {/*    display: 'flex',*/}
      {/*    flexDirection: 'row',*/}
      {/*    justifyContent: 'flex-end',*/}
      {/*    marginLeft: 5,*/}
      {/*  }}*/}
      {/*  onPress={() => createOcrDetect()}>*/}
      {/*  <Icon size={6} as={FontAwesome} name="camera-retro" color={APP_COLOR} />*/}
      {/*  <Text style={[styles.textHeader, {marginRight: 3}]}>*/}
      {/*    {translate('ctp:importWareHouse:ocr')}*/}
      {/*  </Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={props.navigation}
        title={translate('ctp:importWareHouse:title')}
      />
      <Divider />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <_listHeaderComponent />
        <View style={{marginVertical: 25}}>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={nextValue => {
              setValue(nextValue);
            }}>
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              alignItems={{
                base: 'flex-start',
                md: 'center',
              }}
              space={4}
              w="75%"
              maxW="300px">
              <Radio value="one" colorScheme="blue" size="md" my={1}>
                <Text>Nhập kho nhanh</Text>
              </Radio>
              <Radio value="two" colorScheme="blue" size="md" my={1}>
                <Text>Tìm mã xuất</Text>
              </Radio>
            </Stack>
          </Radio.Group>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  viewContent: {flex: 10, backgroundColor: '#FFFFFF'},
  textContent: {fontSize: 14, marginLeft: 10},
  textTitle: {fontSize: 20, fontWeight: 'bold', lineHeight: 26, marginLeft: 10},
  textIndex: {fontSize: 16, fontWeight: 'bold', lineHeight: 22, marginLeft: 10},
  underlined: {
    height: 1,
    backgroundColor: '#000000',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'rgb(0,74,173)',
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
  },
  wrapHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    height: 40,
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 5,
    marginTop: 25,
  },
});
