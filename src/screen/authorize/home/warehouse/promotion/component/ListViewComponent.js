import React, {memo} from 'react';
import {FlatList, View, TouchableOpacity, RefreshControl} from 'react-native';
import {equals} from 'ramda';
import {Box, HStack, VStack, Spacer} from 'native-base';
import {styles} from './styles';
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
  onViewItem = null,
  headerFilter = null,
}) => {
  const checkUser = d => {
    let date = new Date();
    let dateFrom = new Date(d?.promotion?.dateFrom);
    let dateEnd = new Date(d?.promotion?.dateEnd);
    if (date >= dateFrom && date <= dateEnd && d?.promotion?.deleteFlg === 1) {
      return true;
    }
    return false;
  };
  /**
   * Render item flatlist
   * @param any param
   */
  const _renderItem = ({item, index}) => {
    ////console.log(index);
    let createDate = new Date(item?.promotion?.dateFrom ?? new Date());
    let endDate = new Date(item?.promotion?.dateEnd ?? new Date());
    return (
      <TouchableOpacity
        onPress={() => onViewItem(item?.promotion?.id)}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 1,
          paddingHorizontal: 10,
          borderWidth: 0.05,
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
                {item?.promotion?.code}
              </CustomText>
              <CustomText
                color="coolGray.600"
                style={{fontSize: 15, color: '#6e6e6e'}}>
                {item?.promotion?.name}
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
                  style={{fontSize: 14, color: '#6e6e6e'}}
                  alignSelf="flex-end">
                  {createDate.getDate() +
                    '/' +
                    (createDate.getMonth() + 1) +
                    '/' +
                    createDate.getFullYear() +
                    '-' +
                    endDate.getDate() +
                    '/' +
                    (endDate.getMonth() + 1) +
                    '/' +
                    endDate.getFullYear()}
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
                style={{
                  color:
                    item?.deleteFlg?.promotion === 1
                      ? '#6e6e6e'
                      : 'rgb(255,98,89)',
                  fontSize: 15,
                }}
                alignSelf="flex-end">
                {!checkUser(item) ? 'Hết hiệu lực' : 'Còn hiệu lực'}
              </CustomText>
              <VStack />
            </VStack>
          </HStack>
        </Box>
      </TouchableOpacity>
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
  const _keyExtractor = item => item?.promotion?.id;

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
      ListHeaderComponent={headerFilter}
      ItemSeparatorComponent={_ItemSeparatorComponent}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
    />
  );
};
export const ListView = memo(ListViewComponent, equals);
