import { ONE_SIGNAL_APP_ID } from '@env';
import { CustomStatusBar } from '@src/components/';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider, VStack } from 'native-base';
import React from 'react';
import { getUniqueId } from 'react-native-device-info';
import { OneSignal } from 'react-native-onesignal';

import { AuthContextProvider } from './contexts/AuthContext';
import { Navigation } from './navigation/NavigationContainer';
import * as theme from './theme';

// OneSignal Initialization
OneSignal.initialize(ONE_SIGNAL_APP_ID);
// TODO: Refactor this part, move it to user settings
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
        <CustomStatusBar />
        <VStack flex="1" bg="background.100">
          <AuthContextProvider>
            <Navigation />
          </AuthContextProvider>
        </VStack>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default App;
