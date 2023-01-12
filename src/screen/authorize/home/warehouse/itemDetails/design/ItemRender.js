import {Box, HStack, Icon, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {styles} from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import {ItemRenderEdit} from './ItemRenderEdit';
import {numberFormat} from '../../../../../../until';
import {CustomText} from '../../../../../../library/components';
import {useSelector} from 'react-redux';
import {
  getDvtCode,
  getRole,
} from '../../../../../unAuthorize/login/redux/appReducers';

export function ItemRender({data, index, onSubmit}) {
  const dvt = useSelector(getDvtCode);
  const refEdit = React.createRef();
  const openModal = () => {
    refEdit.current.openModal(data);
  };
  const role = useSelector(getRole);
  return (
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
            {index + 1}
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
            {dvt.find(x => x.dvtCode === data.dvtCode)?.name}
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
            {data?.quality}
          </CustomText>
        </Box>
        <Box style={styles.columnText}>
          <Text
            fontSize="15"
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800">
            {numberFormat(data?.priceItems)}
          </Text>
        </Box>
        <Box style={{width: '15%', alignItems: 'flex-start'}}>
          {(role === 'ROLE_A' || role === 'ROLE_S') && (
            <TouchableOpacity onPress={() => openModal()}>
              <Icon size={25} as={FontAwesome} color={'red'} name="edit" />
            </TouchableOpacity>
          )}
        </Box>
      </HStack>

      <ItemRenderEdit ref={refEdit} onSave={onSubmit} />
    </Box>
  );
}
