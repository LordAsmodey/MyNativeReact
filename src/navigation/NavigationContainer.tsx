//import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './stacks/RootStack';

export const Navigation = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);
