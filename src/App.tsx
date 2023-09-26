import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NativeBaseProvider, VStack } from 'native-base';
import * as theme from './theme';
import { Navigation } from './navigation/NavigationContainer';
function App(): React.JSX.Element {
  return (
    <NativeBaseProvider theme={theme.theme} config={theme.config}>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
      <VStack flex="1" bg="gray.100">
        <Navigation />
      </VStack>
    </NativeBaseProvider>
  );
}

export default App;
