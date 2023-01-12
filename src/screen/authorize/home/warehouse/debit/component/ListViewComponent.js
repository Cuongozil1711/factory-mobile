import React, {memo, useCallback, useRef} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import {equals} from 'ramda';
import {
  Box,
  HStack,
  VStack,
  Spacer,
  Avatar,
  Icon,
  Image,
  Button,
} from 'native-base';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from './styles';
import {CustomText, Divider} from '../../../../../../library/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {APP_COLOR} from '../../../../../../config';
import {numberFormat} from '../../../../../../until';
import {Block} from '../../../../../../library/components/Block/Block';
import {updateBillAPI} from '../redux/DebitApi';

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
  onRefresh = null,
  onScrollBeginDrag = null,
  onScrollToTop = null,
  onScroll = null,
  onViewItem = null,
  onViewOrder = null,
  headerFilter = null,
  dispatch = null,
}) => {
  /**
   * Reference để swipe delete
   */
  const _swipe = useRef();

  /**
   * Confirm trước khi xóa
   */
  /**
   * Confirm trước khi xóa
   */
  const _onConfirmDelete = useCallback(payload => {
    if (_swipe.current) {
      //console.log(payload);
      _swipe.current.close();
      //console.log(payload);
      dispatch(updateBillAPI(payload, onRefresh));
    }
  }, []);

  /**
   * Render item flatlist
   * @param any param
   */
  const _renderItem = ({item, index}) => {
    return (
      <Swipeable
        ref={_swipe}
        friction={2}
        enable={true}
        useNativeAnimations={true}
        avgTouches={true}
        shouldCancelWhenOutside={true}
        renderRightActions={(progress, dragX) =>
          item.state !== 'COMPLETE' ? (
            <RenderDeleteButton
              progress={progress}
              onPress={() => _onConfirmDelete(item?.bill?.id)}
              dragX={dragX}
            />
          ) : null
        }>
        <TouchableOpacity
          onPress={() => onViewItem(item?.bill?.id)}
          style={{
            paddingHorizontal: 10,
            backgroundColor: '#FFF',
            borderWidth: 0.1,
            borderRadius: 5,
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
                  Tên đơn: {item?.orderItemResponseDTO?.name}
                </CustomText>
                <CustomText color="coolGray.600" style={{fontSize: 15}}>
                  Mã: {item?.orderItemResponseDTO?.code}
                </CustomText>
                <CustomText color="coolGray.600" style={{fontSize: 15}}>
                  KH: {item?.orderItemResponseDTO?.customerDto?.name}
                </CustomText>
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
                  {numberFormat(item?.bill?.totalPrice)}
                </CustomText>
                <CustomText color="coolGray.600" style={{fontSize: 15}}>
                  {numberFormat(item?.bill?.totalPriceCustomer)}
                </CustomText>
                <CustomText
                  color="coolGray.600"
                  style={{fontSize: 15, color: 'red'}}>
                  {numberFormat(
                    item?.bill?.totalPrice - item?.bill?.totalPriceCustomer,
                  )}
                </CustomText>
              </VStack>
            </HStack>
          </Box>
        </TouchableOpacity>
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
