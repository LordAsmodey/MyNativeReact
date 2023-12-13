import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authUser } from '@src/api/api';
import { useUser } from '@src/contexts/AuthContext';
import { RootStackParamsList } from '@src/navigation/stacks/RootStack';
import { Button, Text, VStack } from 'native-base';
import React from 'react';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const { setTokens } = useUser();

  const saveTokens = async () => {
    const tokens = await authUser({ email: 'test1@test.com', password: '123456' });
    if (tokens) {
      setTokens(tokens);
    }
  };

  return (
    <VStack>
      <Text>WelcomeScreen</Text>
      <Button mb="36px" onPress={() => navigation.navigate('Tabs', { screen: 'DashboardScreen' })}>
        Start app
      </Button>
      <Button onPress={saveTokens}>TEST</Button>
    </VStack>
  );
};
