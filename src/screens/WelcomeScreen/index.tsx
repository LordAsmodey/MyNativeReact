import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text, VStack } from 'native-base';
import React from 'react';

import { RootStackParamsList } from '../../navigation/stacks/RootStack';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <VStack>
      <Text>WelcomeScreen</Text>
      <Button onPress={() => navigation.navigate('Tabs', { screen: 'BasicLevelScreen' })}>Start app</Button>
    </VStack>
  );
};
