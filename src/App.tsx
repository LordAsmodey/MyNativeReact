import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <Text>App component</Text>
    </SafeAreaView>
  );
}

export default App;
