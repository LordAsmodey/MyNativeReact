//import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { RootStack } from './stacks/RootStack';

export const Navigation = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);
