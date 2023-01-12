import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigation} from './homeNavigation/RootNavigation';

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};
