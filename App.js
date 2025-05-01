import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Main } from "./components/main"
export default function App() {
  return ( 
    <SafeAreaProvider>
    <View style={styles.container}>
      <StatusBar style="ligth" />
      <Main /> 
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
