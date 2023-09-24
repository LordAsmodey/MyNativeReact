import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import * as theme from './theme';
function App(): React.JSX.Element {
  return (
    <NativeBaseProvider theme={theme.theme} config={theme.config}>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
      <VStack flex="1" bg="gray.100">
        <Text>App component</Text>
      </VStack>
    </NativeBaseProvider>
  );
}

export default App;
