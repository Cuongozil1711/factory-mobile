import {Box, Divider, HStack, Spacer, VStack} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import {CustomText} from '../../../../../library/components';
import {APP_COLOR, dvt} from '../../../../../config';
import {numberFormat} from '../../../../../until';
import {useSelector} from 'react-redux';
import {getDvtCode} from '../../../../unAuthorize/login/redux/appReducers';

export function ItemRender({item, index}) {
  // console.log('dvtCode: ' + dvt);s
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
              {item?.itemsResponseDTO?.name}
            </CustomText>
            <CustomText
              color="coolGray.600"
              style={{fontSize: 15, color: '#212121'}}>
              {item?.numberBox} X{' '}
              {dvt.find(e => e.dvtCode === item?.dvtCode)?.name} (
              {item?.quality})
            </CustomText>
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
          {/*    {numberFormat(item?.totalPrice)}*/}
          {/*  </CustomText>*/}
          {/*</VStack>*/}
        </HStack>
      </Box>

      <Divider />
    </View>
  );
}
