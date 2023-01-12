import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Box,
  HStack,
  Icon,
  Text,
  Image,
  Spacer,
  VStack,
  Divider,
  useToast,
} from 'native-base';
import Header from '../../../../../../components/Header';
import {translate} from '../../../../../../common/i18n/translate';
import {Block} from '../../../../../../library/components/Block/Block';
import {getCategory} from '../../../bottomHome/item/redux/itemReducers';
import {useDispatch, useSelector} from 'react-redux';
import {ItemRender} from '../design/ItemRender';
import {styles} from '../design/styles';
import {updatePriceItem} from '../../../bottomHome/item/redux/itemApi';
import {CustomText} from '../../../../../../library/components';
export function ItemScanner({navigation, route}) {
  const [list, setList] = useState(route?.params ?? {});
  const categorys = useSelector(getCategory);
  const dispatch = useDispatch();
  const toast = useToast();

  const onSubmit = response => {
    ////console.log(response);
    let priceItem = list?.priceItemsDtos.map(e => {
      if (e?.id === response?.id) {
        return {
          ...response,
        };
      } else {
        return e;
      }
    });
    setList({
      ...list,
      priceItemsDtos: priceItem,
    });
    ////console.log('list: ' + JSON.stringify(list));

    dispatch(
      updatePriceItem(
        {
          ...list,
          priceItemsDtos: priceItem,
        },
        onSucessUpdate,
      ),
    );
  };

  const onSucessUpdate = res => {
    if (res?.status === 200) {
      // showDialog(translate('dialog:update'), [
      //   {text: translate('dialog:yes'), onPress: () => {}},
      // ]);
      toast.show({
        title: translate('dialog:update'),
        delay: 1000,
      });
    }
  };
  //console.log(list);

  return (
    <Block block backgroundColor="#FFFFFF">
      <Header
        rightIcon={false}
        iconApp={true}
        navigation={navigation}
        title={translate('ctp:details')}
      />
      <Box
        maxW="100%"
        borderColor="muted.800"
        flexdirection="column"
        pl={['0', '2']}
        pr={['0', '0']}
        py="6">
        <HStack
          space={[2, 3]}
          style={{flexDirection: 'column', paddingHorizontal: 10}}
          justifyContent="flex-start">
          <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <Image
              source={{
                uri: list?.image,
              }}
              style={{alignItems: 'center', marginVertical: 10}}
              alt="item"
              size="md"
            />
          </View>

          <CustomText
            fontSize="17"
            _dark={{
              color: 'warmGray.90',
            }}
            color="coolGray.900"
            bold>
            {translate('ctp:item:code')}: {list?.code}
          </CustomText>

          <CustomText
            fontSize="17"
            _dark={{
              color: 'warmGray.90',
            }}
            color="coolGray.900"
            bold>
            {translate('ctp:item:name')}: {list?.name}
          </CustomText>

          <CustomText
            fontSize="17"
            _dark={{
              color: 'warmGray.90',
            }}
            color="coolGray.900"
            bold>
            {translate('ctp:item:category')}:{' '}
            {categorys.find(x => x.id === list?.idCategory)?.name ?? 0}
          </CustomText>

          <CustomText
            fontSize="17"
            _dark={{
              color: 'warmGray.90',
            }}
            color="coolGray.900"
            bold>
            {translate('ctp:item:inWareHouse')}: {list?.totalInWareHouse ?? 0}
          </CustomText>

          <CustomText
            fontSize="17"
            _dark={{
              color: 'warmGray.90',
            }}
            color="coolGray.900"
            bold>
            {translate('ctp:item:outWareHouse')}: {list?.totalSold ?? 0}
          </CustomText>

          <Box style={{marginBottom: 10}}>
            <CustomText
              fontSize="17"
              _dark={{
                color: 'warmGray.90',
              }}
              color="coolGray.900"
              bold>
              {translate('ctp:item:price')}
            </CustomText>
          </Box>

          <Divider />

          <Box
            maxW="100%"
            _dark={{
              borderColor: 'muted.50',
            }}
            style={{marginVertical: 5}}
            borderColor="muted.800"
            pl={['0', '0']}
            pr={['0', '0']}
            py="0">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Box style={{alignItems: 'center', width: '10%'}}>
                <CustomText
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  fontSize="15"
                  color="coolGray.800"
                  bold>
                  {translate('ctp:item:stt')}
                </CustomText>
              </Box>
              <Box style={styles.columnText}>
                <CustomText
                  fontSize="15"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  {translate('ctp:item:unit')}
                </CustomText>
              </Box>
              <Box style={styles.columnText}>
                <CustomText
                  fontSize="15"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  {translate('ctp:item:quanlity')}
                </CustomText>
              </Box>
              <Box style={styles.columnText}>
                <CustomText
                  fontSize="15"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800">
                  {translate('ctp:item:priceItem')}
                </CustomText>
              </Box>
              <Box style={{width: '15%'}} />
            </HStack>

            {list?.priceItemsDtos.map((e, index) => {
              return <ItemRender data={e} index={index} onSubmit={onSubmit} />;
            })}
          </Box>
        </HStack>
      </Box>
    </Block>
  );
}
