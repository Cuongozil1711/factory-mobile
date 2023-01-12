import React from 'react';
import {StyleSheet} from 'react-native';
import {VStack, Image, Text, HStack, Icon} from 'native-base';
import {MaterialCommunityIcons} from '@native-base/icons';

export default function Example({item}) {
  return (
    <VStack space={2} margin={3}>
      <Image
        width={240}
        height={200}
        resizeMode={'cover'}
        source={{
          uri: item.image,
        }}
        alt="Hotel"
      />
      <Text style={styles.textNameItem}>{item.name}</Text>
      <HStack space={2}>
        <Icon
          as={MaterialCommunityIcons}
          name="map-marker"
          size="sm"
          color="#FF3700"
        />
        <Text style={styles.textAddressItem} numberOfLines={1}>
          {item.address}
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'}>
        <Text>150.000đ</Text>
        <HStack>
          <Text>{item.star}</Text>
          <Icon
            as={MaterialCommunityIcons}
            name="star"
            size="sm"
            color="#FF3700"
          />
        </HStack>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  textNameItem: {fontWeight: 'bold', fontSize: 16, maxWidth: 200},
  textAddressItem: {fontSize: 14, maxWidth: 200},
});
