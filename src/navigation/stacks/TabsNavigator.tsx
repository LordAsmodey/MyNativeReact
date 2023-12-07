import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { AdvancedLevelScreen } from '../../screens/AdvancedLevelScreen';
import { BasicLevelScreen } from '../../screens/BasicLevelScreen';
import { SettingsScreen } from '../../screens/SettingsScreen';

export type TabsNavigatorParamsList = {
  BasicLevelScreen: undefined;
  AdvancedLevelScreen: undefined;
  SettingsScreen: undefined;
};
export const TabsNavigator = () => {
  const BottomTabs = createBottomTabNavigator<TabsNavigatorParamsList>();
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <BottomTabs.Screen name="BasicLevelScreen" component={BasicLevelScreen} />
      <BottomTabs.Screen name="AdvancedLevelScreen" component={AdvancedLevelScreen} />
      <BottomTabs.Screen name="SettingsScreen" component={SettingsScreen} />
    </BottomTabs.Navigator>
  );
};
