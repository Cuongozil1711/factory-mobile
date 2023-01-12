import {Box, Divider, HStack, Spacer, VStack} from 'native-base';
import React from 'react';
import {APP_COLOR} from '../../../../../../config';
import {View} from 'react-native';
import {numberFormat} from '../../../../../../until';
import {CustomText} from '../../../../../../library/components';
import {useSelector} from 'react-redux';
import {getRole} from '../../../../../unAuthorize/login/redux/appReducers';
import {loadString} from '../../../../../../until/storage';

export function ItemRender({item, index}) {
  let dateExpired = new Date(item?.dateExpired ?? new Date());
  let role = loadString('role', '');
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        paddingHorizontal: 10,
      }}>
      <Box
        maxW="100%"
        _dark={{
          borderColor: 'muted.50',
        }}
        borderColor="muted.800"
        pl={['0', '0']}
        pr={['0', '0']}
        py="2">
        <HStack space={[2, 3]} justifyContent="space-between">
          <VStack>
            <CustomText
              _dark={{
                color: 'warmGray.50',
              }}
              style={{fontSize: 16, color: '#212121'}}
              bold>
              {item?.nameItems}
            </CustomText>
            <CustomText
              color="coolGray.600"
              style={{fontSize: 15, color: '#212121'}}>
              {item?.quantity} X {item?.numberBox}
            </CustomText>
            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CustomText
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                style={{fontSize: 14, color: '#212121'}}
                alignSelf="flex-end">
                {dateExpired.getDate() +
                  '/' +
                  (dateExpired.getMonth() + 1) +
                  '/' +
                  dateExpired.getFullYear()}
              </CustomText>
            </VStack>
          </VStack>
          <Spacer />
          {/*<VStack*/}
          {/*  style={{*/}
          {/*    display: 'flex',*/}
          {/*    flexDirection: 'column',*/}
          {/*    alignItems: 'flex-end',*/}
          {/*  }}>*/}
          {/*  <CustomText*/}
          {/*    fontSize="xs"*/}
          {/*    _dark={{*/}
          {/*      color: 'warmGray.50',*/}
          {/*    }}*/}
          {/*    style={{color: APP_COLOR, fontSize: 15}}*/}
          {/*    alignSelf="flex-end">*/}
          {/*    {role != 'K' && numberFormat(item?.totalPrice)}*/}
          {/*  </CustomText>*/}
          {/*</VStack>*/}
        </HStack>
      </Box>

      <Divider />
    </View>
  );
}
