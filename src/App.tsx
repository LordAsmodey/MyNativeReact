import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <Text>App component</Text>
      </View>
    </>
  );
}

export default App;
