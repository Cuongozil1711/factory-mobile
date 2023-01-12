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
  role = null,
}) => {
  const parseState = state => {
    let title = '';
    if (state === 'COMPLETE') {
      title = 'Hoàn thành';
    } else if (state === 'CANCELED') {
      title = 'Hủy bỏ';
    } else {
      title = 'Đang thực hiện';
    }

    // eslint-disable-next-line no-unreachable
    return (
      <CustomText
        fontSize="xs"
        _dark={{
          color: 'warmGray.50',
        }}
        style={{
          color:
            state === 'CANCELED'
              ? '#6e6e6e'
              : state === 'COMPLETE'
              ? 'rgb(255,98,89)'
              : APP_COLOR,
          fontSize: 15,
        }}
        alignSelf="flex-end">
        {title}
      </CustomText>
    );
  };
  /**
   * Render item flatlist
   * @param any param
   */
  const _renderItem = ({item, index}) => {
    ////console.log(index);
    let createDate = new Date(item?.createDate ?? new Date());
    return (
      <TouchableOpacity
        onPress={() => onViewItem(item?.idReceiptExport)}
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
                {item?.receiptExportWareHouse?.code}
              </CustomText>
              <CustomText
                color="coolGray.600"
                style={{fontSize: 15, color: '#6e6e6e'}}>
                {item?.receiptExportWareHouse?.name}
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
                {role !== 'ROLE_K' && numberFormat(item?.totalPrice)}
              </CustomText>
              <CustomText
                color="coolGray.600"
                style={{fontSize: 15, color: '#6e6e6e'}}>
                SL: {item?.quantityItems}
              </CustomText>
              <VStack>{parseState(item?.receiptExportWareHouse?.state)}</VStack>
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
  const _keyExtractor = item => item.idReceiptExport.toString();

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
