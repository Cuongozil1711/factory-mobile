import React, {memo, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import {equals} from 'ramda';
import {Box, Image, HStack, VStack, Spacer, Icon} from 'native-base';
import {styles} from './styles';
import {translate} from '../../../../../../common/i18n/translate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomText, Divider} from '../../../../../../library/components';

const ListViewComponent = ({
  data = [],
  flatListRef,
  onRefresh = null,
  onScrollBeginDrag = null,
  onScrollToTop = null,
  onScroll = null,
  showTextAll = false,
  qrCode = null,
  onViewItem = null,
}) => {
  /**
   * Render item flatlist
   * @param any param
   */
  const _renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => onViewItem(item?.id)}
          style={{
            marginVertical: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,

            elevation: 14,
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
              <Image
                source={{
                  uri: item?.image,
                }}
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
                  {item?.name}
                </CustomText>
                <CustomText
                  style={{fontSize: 15}}
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  {item?.code}
                </CustomText>
              </VStack>
              <Spacer />
              <VStack>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 15}}
                  alignSelf="flex-end">
                  Tồn {item?.totalInWareHouse}
                </CustomText>
              </VStack>
            </HStack>
          </Box>
        </TouchableOpacity>
      </>
    );
  };

  /**
   * Render kho?ng tr?ng gi?a c�c item
   */
  const _ItemSeparatorComponent = () => (
    <View style={[styles.viewSpace]}>
      <Divider />
    </View>
  );

  // const qrCode = () => {
  //   ////console.log('A');
  // };

  /**
   * G�n key cho c�c item flatlist
   * @param any item
   * @param number index
   */
  const _keyExtractor = item => item.id.toString();

  /**
   * Render header
   */
  const _listHeaderComponent = () => (
    <View style={[styles.wrapHeader]}>
      <Text style={[styles.textHeader]}>{translate('ctp:sumItem')}</Text>
      <Text style={[styles.textHeader]}>{data?.length}</Text>
      <Icon
        onPress={() => qrCode()}
        color="#495057"
        size={8}
        as={FontAwesome}
        name="barcode"
      />
    </View>
  );

  /**
   * Render
   */
  return (
    <FlatList
      style={styles.flatList}
      ref={flatListRef}
      data={data}
      onScroll={onScroll}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={false} />
      }
      onScrollToTop={onScrollToTop}
      onScrollBeginDrag={onScrollBeginDrag}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={_listHeaderComponent}
      ItemSeparatorComponent={_ItemSeparatorComponent}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
    />
  );
};
export const ListView = memo(ListViewComponent, equals);
