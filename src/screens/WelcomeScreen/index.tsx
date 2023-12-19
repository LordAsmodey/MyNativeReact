import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authUser, registerNewUser } from '@src/api/api';
import { AuthInputs, AuthInputType, ButtonGreen, Layout, Tab, Tabs } from '@src/components/';
import { useUser } from '@src/contexts/AuthContext';
import { RootStackParamsList } from '@src/navigation/stacks/RootStack';
import { Box, Text } from 'native-base';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const activeInputTypes = [{ type: AuthInputType.Email }, { type: AuthInputType.Password }];

enum authTitles {
  SignIn = 'Sign in',
  SignUp = 'Sign up',
}

const authOptions = [
  {
    title: authTitles.SignIn,
  },
  {
    title: authTitles.SignUp,
  },
];

export const WelcomeScreen = () => {
  const [isSignInActive, setSignInActive] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const { setTokens, deviceId } = useUser();

  const title = isSignInActive ? authTitles.SignIn : authTitles.SignUp;

  const switchAuthMode = () => {
    setSignInActive((prev) => !prev);
  };

  const { control, handleSubmit, formState } = useForm({
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

  const { errors } = formState;
  const hasErrors = Object.keys(errors).length > 0;

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
      <Box flex="1" justifyContent="space-between">
        <Box>
          <Tabs>
            {authOptions.map((item, i) => (
              <Tab
                key={item.title}
                title={item.title}
                isActive={isSignInActive === (i === 0)}
                onPress={switchAuthMode}
              />
            ))}
          </Tabs>
          <Text color="white" fontSize="3xl" fontWeight="700" mt="40px">
            {title}
          </Text>
          <AuthInputs control={control} activeInputTypes={activeInputTypes} />
        </Box>
        <ButtonGreen
          isDisabled={hasErrors}
          mt="36px"
          onPress={handleSubmit(isSignInActive ? onAuthHandler : onRegisterHandler)}>
          {title}
        </ButtonGreen>
      </Box>
    </Layout>
  );
};
