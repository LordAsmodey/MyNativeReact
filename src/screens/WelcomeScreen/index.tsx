import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authUser, registerNewUser } from '@src/api/api';
import { ButtonGreen, ButtonRed, EmailInput, Layout } from '@src/components/';
import { useUser } from '@src/contexts/AuthContext';
import { RootStackParamsList } from '@src/navigation/stacks/RootStack';
import { Box, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { PasswordInput } from '../../components/Input/PasswordInput';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const { setTokens, deviceId } = useUser();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const [email, password] = useWatch({
    control,
    name: ['email', 'password'],
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
    <Layout>
      <Box px="24px" pt="24px">
        <HStack h="46px" bg="gray.100">
          <Text>BTNS</Text>
        </HStack>
        <Text color="white" fontSize="3xl" fontWeight="700">
          Sign in
        </Text>
        {/*@ts-ignore*/}
        <EmailInput control={control} />
        {/*@ts-ignore*/}
        <PasswordInput control={control} />
        <ButtonGreen mt="36px" onPress={handleSubmit(onAuthHandler)}>
          Login
        </ButtonGreen>
        <VStack mb="1" />
        <ButtonRed onPress={handleSubmit(onRegisterHandler)}>Register</ButtonRed>
      </Box>
    </Layout>
  );
};
