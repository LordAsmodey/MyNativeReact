import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { AdvancedLevelScreen } from '../../screens/AdvancedLevelScreen';
import { DashboardScreen } from '../../screens/DashboardScreen';
import { SettingsScreen } from '../../screens/SettingsScreen';

export type TabsNavigatorParamsList = {
  DashboardScreen: undefined;
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
      <BottomTabs.Screen name="DashboardScreen" component={DashboardScreen} />
      <BottomTabs.Screen name="AdvancedLevelScreen" component={AdvancedLevelScreen} />
      <BottomTabs.Screen name="SettingsScreen" component={SettingsScreen} />
    </BottomTabs.Navigator>
  );
};
