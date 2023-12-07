import React from 'react';
import { Button, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../navigation/stacks/RootStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <VStack>
      <Text>WelcomeScreen</Text>
      <Button onPress={() => navigation.navigate('Tabs', { screen: 'BasicLevelScreen' })}>Start app</Button>
    </VStack>
  );
};
