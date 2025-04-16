import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source = {{ uri: "https://static.wikia.nocookie.net/omegia/images/4/49/TungTungTungSahur.jpg/revision/latest?cb=20250331233111&path-prefix=es" }}
        style = {{ width: 503, heigth: 758 }}
      />
      <StatusBar style="auto" />
      <Text>TUNG TUNG TUNG SAHUR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
