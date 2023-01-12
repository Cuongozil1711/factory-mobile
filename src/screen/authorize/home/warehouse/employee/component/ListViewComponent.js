import React, {memo} from 'react';
import {FlatList, View, TouchableOpacity, RefreshControl} from 'react-native';
import {equals} from 'ramda';
import {Box, HStack, VStack, Spacer, Avatar, Icon} from 'native-base';
import {styles} from './styles';
import {CustomText, Divider} from '../../../../../../library/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {APP_COLOR} from '../../../../../../config';

const ListViewComponent = ({
  data = [],
  flatListRef,
  onRefresh = null,
  onScrollBeginDrag = null,
  onScrollToTop = null,
  onScroll = null,
  onViewItem = null,
  onViewOrder = null,
  headerFilter = null,
}) => {
  /**
   * Render item flatlist
   * @param any param
   */
  const _renderItem = ({item, index}) => {
    let url = item?.image
      ? item?.image
      : 'http://ui-avatars.com/api/?background=random&name=K' +
        item?.fullNameDto?.lastName;
    return (
      <TouchableOpacity
        onPress={() => onViewItem(item?.id)}
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
          <HStack
            space={[2, 3]}
            justifyContent="space-between"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <VStack
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Avatar
                bg="green.500"
                alignSelf="center"
                size="md"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                source={{
                  uri: url,
                }}
              />
              <VStack
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginHorizontal: 15,
                }}>
                <CustomText
                  color="coolGray.600"
                  style={{fontSize: 15, color: '#0a0a0a'}}>
                  {item?.fullNameDto?.firstName +
                    ' ' +
                    item?.fullNameDto?.lastName}
                </CustomText>
                <VStack
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    color={'#495057'}
                    size={4}
                    as={FontAwesome}
                    name="phone"
                  />
                  <CustomText
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    style={{fontSize: 14, color: APP_COLOR}}
                    alignSelf="flex-end">
                    {item?.tel}
                  </CustomText>
                </VStack>
                <VStack
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    color={'#495057'}
                    size={4}
                    as={FontAwesome}
                    name="ship"
                  />
                  <CustomText
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    style={{
                      fontSize: 14,
                      color: item?.status ? APP_COLOR : 'red',
                      marginLeft: 5,
                    }}
                    alignSelf="flex-end">
                    {' ' + item?.status == 1
                      ? item?.namePosition
                      : 'Ngừng hoạt động'}
                  </CustomText>
                </VStack>
              </VStack>
            </VStack>
            <Spacer />
            <TouchableOpacity
              onPress={() => onViewOrder(item.idUser)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <CustomText
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                style={{
                  color: item?.status === 1 ? APP_COLOR : APP_COLOR,
                  fontSize: 15,
                  textDecorationLine: 'underline',
                }}
                alignSelf="flex-end">
                Đơn hàng
              </CustomText>
              <VStack />
            </TouchableOpacity>
          </HStack>
        </Box>
      </TouchableOpacity>
    );
  };

  /**
   * Render kho?ng tr?ng gi?a c�c item
   */
  const _ItemSeparatorComponent = () => (
    <View style={[styles.viewSpace]}>{/*<Divider />*/}</View>
  );

  // const qrCode = () => {
  //   ////console.log('A');
  // };

  /**
   * G�n key cho c�c item flatlist
   * @param any item
   * @param number index
   */
  const _keyExtractor = item => item?.id;

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
