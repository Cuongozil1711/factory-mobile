import React, {memo} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  Text,
} from 'react-native';
import {equals, times} from 'ramda';
import {Box, HStack, VStack, Spacer, Icon} from 'native-base';
import {styles} from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {APP_COLOR} from '../../../../../../config';
import {numberFormat} from '../../../../../../until';
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
  headerFilter = null,
}) => {
  /**
   * Render item flatlist
   * @param any param
   */
  const _renderItem = ({item, index}) => {
    let createDate = new Date(item?.createDate ?? new Date());
    return (
      <>
        <TouchableOpacity onPress={() => onViewItem(item?.id)}>
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
              <VStack
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  onPress={() => qrCode()}
                  color={item?.deleteFlg === 0 ? '#c3c3c3' : 'rgb(0,74,173)'}
                  size={6}
                  as={FontAwesome}
                  name="cart-plus"
                />
              </VStack>
              <VStack>
                <CustomText
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{fontSize: 16, color: '#212121'}}
                  bold>
                  {item?.code}
                </CustomText>
                <CustomText color="coolGray.600" style={{fontSize: 15}}>
                  {item?.customerDto?.name}
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
                    style={{fontSize: 14}}
                    alignSelf="flex-end">
                    {createDate.getDate() +
                      '/' +
                      (createDate.getMonth() + 1) +
                      '/' +
                      createDate.getFullYear() +
                      ' ' +
                      createDate.getHours() +
                      ':' +
                      createDate.getMinutes()}
                  </CustomText>
                </VStack>
              </VStack>
              <Spacer />
              <VStack
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{color: APP_COLOR, fontSize: 15}}
                  alignSelf="flex-end">
                  {numberFormat(item?.totalPrice)}
                </CustomText>
                <CustomText color="coolGray.600" style={{fontSize: 15}}>
                  SL: {item?.quantity}
                </CustomText>
                <VStack>
                  <CustomText
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    style={{
                      color:
                        item?.deleteFlg === 1 ? '#495057' : 'rgb(255,98,89)',
                      fontSize: 15,
                    }}
                    alignSelf="flex-end">
                    {item?.deleteFlg === 0 ? 'Đã hủy' : 'Hoàn thành'}
                  </CustomText>
                </VStack>
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
  const _keyExtractor = item => item.id.toString() + item.code;

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
      ListHeaderComponent={headerFilter}
      ItemSeparatorComponent={_ItemSeparatorComponent}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
    />
  );
};
export const ListView = memo(ListViewComponent, equals);
