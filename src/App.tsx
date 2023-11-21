import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NativeBaseProvider, VStack } from 'native-base';
import * as theme from './theme';
import { Navigation } from './navigation/NavigationContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './contexts/UserContext';

import { OneSignal } from 'react-native-onesignal';
import { getUniqueId } from 'react-native-device-info';

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
          <UserContextProvider>
            <Navigation />
          </UserContextProvider>
        </VStack>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default App;
