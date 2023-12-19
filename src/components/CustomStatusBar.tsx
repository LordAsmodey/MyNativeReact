import { StatusBar } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export const CustomStatusBar = () => (
  <View style={styles.statusBar}>
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  statusBar: { backgroundColor: '#1B232A' },
});
