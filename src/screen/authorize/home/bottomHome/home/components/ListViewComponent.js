import React, {memo, useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Box, Image, HStack, VStack, Spacer, Icon} from 'native-base';
import {styles} from './styles';
import {CustomText, Divider} from '../../../../../../library/components';
import {numberFormat} from '../../../../../../until';
import {APP_COLOR} from '../../../../../../config';

export const ListView = ({data = []}) => {
  /**
   * Render item flatlist
   * @param any param
   */
  const ItemView = ({item}) => {
    return (
      <>
        <TouchableOpacity>
          <Box
            maxW="100%"
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor="muted.800"
            pl={['0', '0']}
            pr={['0', '0']}
            py="2">
            <HStack
              space={[2, 3]}
              justifyContent="space-between"
              style={{width: '100%'}}>
              <Image
                source={{
                  uri: item?.image,
                }}
                borderRadius={5}
                alt="item"
                size="md"
              />
              <VStack>
                <CustomText
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 15}}
                  bold>
                  {item?.itemsName}
                </CustomText>
                <CustomText
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 15, color: APP_COLOR}}
                  bold>
                  {numberFormat(item?.totalPrice)}
                </CustomText>
              </VStack>
              <Spacer />
              <VStack style={{alignSelf: 'flex-end'}}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 15}}
                  alignSelf="flex-end">
                  SL: {item?.quantityItems}
                </CustomText>
              </VStack>
            </HStack>
          </Box>
          <Divider />
        </TouchableOpacity>
      </>
    );
  };
  /**
   * Render
   */
  return (
    <View>
      {data.map((e, index) => {
        ////console.log(index);
        return <ItemView item={e} />;
      })}
    </View>
  );
};
