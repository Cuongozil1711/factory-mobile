import React, {memo, useCallback, useRef} from 'react';
import {FlatList, View, RefreshControl, Animated} from 'react-native';
import {equals} from 'ramda';
import {Box, HStack, VStack, Spacer, Button, Icon} from 'native-base';
import {styles} from './styles';
import {APP_COLOR} from '../../../../../../config';
import {CustomText, Divider} from '../../../../../../library/components';
import {Block} from '../../../../../../library/components/Block/Block';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useDispatch} from 'react-redux';
import {deleteReceiptImportWareHouseApi} from '../redux/ReceiptImportWareHouseApi';

const RenderDeleteButton = ({progress, onPress}) => {
  const scaleX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={{transform: [{translateX: 40}, {scaleX}, {translateX: -40}]}}>
      <Block block width={80} color={'#ff4040'}>
        <Button onPress={onPress} style={[styles.buttonDelete]}>
          <Icon size={6} as={FontAwesome} name="remove" color="#FFF" />
        </Button>
      </Block>
    </Animated.View>
  );
};

const ListViewComponent = ({
  data = [],
  flatListRef,
  dispatch = null,
  onRefresh = null,
  onScrollBeginDrag = null,
  onScrollToTop = null,
  onScroll = null,
  headerFilter = null,
}) => {
  /**
   * Render item flatlist
   * @param any param
   */

  /**
   * Reference để swipe delete
   */
  const _swipe = useRef();

  /**
   * Confirm trước khi xóa
   */
  const _onConfirmDelete = useCallback(payload => {
    if (_swipe.current) {
      _swipe.current.close();
      //console.log(payload);
      dispatch(deleteReceiptImportWareHouseApi(payload, onRefresh));
    }
  }, []);

  // /**
  //  * Xóa record hiện tại bằng cách vuối sang trái và ấn nút xóa(recycle bin icon)
  //  */
  // const _onDelete = useCallback(() => {
  //   if (_swipe.current) {
  //     // dispatch(removeToListScannedTotal(itemRetsu.zaikoMaster ?? {}));
  //     // dispatch(removeToListScannedChild(itemRetsu));
  //     _swipe.current.close();
  //   }
  // }, []);

  const _renderItem = ({item, index}) => {
    return (
      <Swipeable
        ref={_swipe}
        friction={2}
        enable={item.state !== 'COMPLETE' ? true : false}
        useNativeAnimations={true}
        avgTouches={true}
        shouldCancelWhenOutside={true}
        renderRightActions={(progress, dragX) =>
          item.state !== 'COMPLETE' ? (
            <RenderDeleteButton
              progress={progress}
              onPress={() => _onConfirmDelete(item.id)}
              dragX={dragX}
            />
          ) : null
        }>
        <View
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
                  Mã phiếu
                </CustomText>
                <CustomText
                  color="coolGray.600"
                  style={{fontSize: 16, color: '#212121'}}>
                  Tên phiếu
                </CustomText>
                <CustomText
                  color="coolGray.600"
                  style={{fontSize: 16, color: '#212121'}}>
                  Tên kho
                </CustomText>
                <CustomText
                  color="coolGray.600"
                  style={{fontSize: 16, color: '#212121'}}>
                  Người thực hiện
                </CustomText>
                <CustomText
                  color="coolGray.600"
                  style={{fontSize: 16, color: '#212121'}}>
                  Trạng thái
                </CustomText>
              </VStack>
              <Spacer />
              <VStack
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                <CustomText
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  style={{color: APP_COLOR, fontSize: 15}}
                  alignSelf="flex-end">
                  {item?.code}
                </CustomText>
                <CustomText
                  color="coolGray.600"
                  style={{fontSize: 15, color: '#6e6e6e'}}>
                  {item?.name}
                </CustomText>
                <CustomText
                  color="coolGray.600"
                  style={{fontSize: 15, color: '#6e6e6e'}}>
                  {item?.nameWareHouse}
                </CustomText>
                <CustomText
                  color="coolGray.600"
                  style={{fontSize: 15, color: '#6e6e6e'}}>
                  {item?.nameCreate}
                </CustomText>
                <VStack>
                  <CustomText
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    style={{
                      color:
                        item?.state === 'COMPLETE'
                          ? '#6e6e6e'
                          : 'rgb(56,9,161)',
                      fontSize: 15,
                    }}
                    alignSelf="flex-end">
                    {item?.state === 'COMPLETE'
                      ? 'Hoàn thành'
                      : 'Đang thực hiện'}
                  </CustomText>
                </VStack>
              </VStack>
            </HStack>
          </Box>
        </View>
      </Swipeable>
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
