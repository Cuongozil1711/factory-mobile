import React from 'react';
import {StyleSheet} from 'react-native';
import {VStack, Text, HStack, Icon} from 'native-base';
import {MaterialCommunityIcons} from '@native-base/icons';
import {ImageBackground} from 'react-native';

export default function Example2({item}) {
  return (
    <VStack space={2} margin={3}>
      <ImageBackground
        style={styles.container}
        resizeMode={'cover'}
        source={{
          uri: item.image,
        }}
        alt="Hotel">
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
      </ImageBackground>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    justifyContent: 'flex-end',
    padding: 4,
  },
  textNameItem: {fontWeight: 'bold', fontSize: 16, maxWidth: 160},
  textAddressItem: {fontSize: 14, maxWidth: 160},
});
