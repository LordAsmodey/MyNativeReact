import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '@src/screens/WelcomeScreen';
import React from 'react';

import { TabsNavigator, TabsNavigatorParamsList } from './TabsNavigator';

export type RootStackParamsList = {
  WelcomeScreen: undefined;
  Tabs: { screen: keyof TabsNavigatorParamsList };
};
export const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamsList>();
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
