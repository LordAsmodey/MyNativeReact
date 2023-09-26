import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BasicLevelScreen } from '../../screens/BasicLevelScreen';
import React from 'react';
import { AdvancedLevelScreen } from '../../screens/AdvancedLevelScreen';
import { HighLevelScreen } from '../../screens/HighLevelScreen';
import { SettingsScreen } from '../../screens/SettingsScreen';

export type TabsNavigatorParamsList = {
  BasicLevelScreen: undefined;
  AdvancedLevelScreen: undefined;
  HighLevelScreen: undefined;
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
      <BottomTabs.Screen name="HighLevelScreen" component={HighLevelScreen} />
      <BottomTabs.Screen name="SettingsScreen" component={SettingsScreen} />
    </BottomTabs.Navigator>
  );
};
