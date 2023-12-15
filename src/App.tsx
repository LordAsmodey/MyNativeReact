import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { OneSignal } from 'react-native-onesignal';

import { AuthContextProvider } from './contexts/AuthContext';
import { Navigation } from './navigation/NavigationContainer';
import * as theme from './theme';

// OneSignal Initialization
OneSignal.initialize('454552f5-e593-450f-8814-f12e7c26ead2');
// requestPermission will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission
OneSignal.Notifications.requestPermission(true);

getUniqueId().then((deviceId) => OneSignal.User.addAlias('deviceId', deviceId));

// Method for listening for notification clicks
OneSignal.Notifications.addEventListener('click', (event) => {
  console.log('OneSignal: notification clicked:', event);
});

const client = new QueryClient();
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <NativeBaseProvider theme={theme.theme} config={theme.config}>
        <SafeAreaView>
          <StatusBar barStyle="light-content" />
        </SafeAreaView>
        <VStack flex="1" bg="gray.100">
          <AuthContextProvider>
            <Navigation />
          </AuthContextProvider>
        </VStack>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default App;
