import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authUser, registerNewUser } from '@src/api/api';
import { EmailInput, LabeledInput } from '@src/components/';
import { useUser } from '@src/contexts/AuthContext';
import { RootStackParamsList } from '@src/navigation/stacks/RootStack';
import { Box, Button, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { getUniqueId } from 'react-native-device-info';

export const WelcomeScreen = () => {
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const { setTokens } = useUser();

  useEffect(() => {
    getUniqueId().then((deviceId) => setDeviceId(deviceId));
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const [email] = useWatch({
    control,
    name: ['email'],
  });

  const onAuthHandler = async () => {
    try {
      const tokens = await authUser({ email, password });
      if (tokens) {
        setTokens(tokens);
        navigation.navigate('Tabs', { screen: 'DashboardScreen' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onRegisterHandler = async () => {
    try {
      const tokens = await registerNewUser({ email, password, deviceId });
      if (tokens) {
        setTokens(tokens);
        navigation.navigate('Tabs', { screen: 'DashboardScreen' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack>
      <Text>WelcomeScreen</Text>
      <Box px="24px">
        <EmailInput control={control} />
        <LabeledInput bg="gray.300" label="Password" value={password} onChangeText={setPassword} type="password" />
        <Button mt="36px" onPress={handleSubmit(onAuthHandler)}>
          Login
        </Button>
        <Button mt="36px" onPress={handleSubmit(onRegisterHandler)}>
          Register
        </Button>
      </Box>
    </VStack>
  );
};
