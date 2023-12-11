import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@src/navigation/stacks/RootStack';
import { Button, Text, VStack } from 'native-base';
import React from 'react';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <VStack>
      <Text>WelcomeScreen</Text>
      <Button onPress={() => navigation.navigate('Tabs', { screen: 'DashboardScreen' })}>Start app</Button>
    </VStack>
  );
};
