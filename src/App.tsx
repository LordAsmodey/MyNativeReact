import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NativeBaseProvider, VStack } from 'native-base';
import * as theme from './theme';
import { Navigation } from './navigation/NavigationContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './contexts/UserContext';

const client = new QueryClient();
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <NativeBaseProvider theme={theme.theme} config={theme.config}>
        <SafeAreaView>
          <StatusBar barStyle="light-content" />
        </SafeAreaView>
        <VStack flex="1" bg="gray.100">
          <UserContextProvider>
            <Navigation />
          </UserContextProvider>
        </VStack>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default App;
