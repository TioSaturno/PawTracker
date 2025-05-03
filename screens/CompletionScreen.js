import React from 'react';
import { View, Text } from 'react-native';

export default function CompletionScreen({ dogName, rssi }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 22 }}>¡Configuración completa!</Text>
      <Text style={{ marginTop: 10 }}>Perro: {dogName}</Text>
      <Text>RSSI de límite guardado: {rssi} dBm</Text>
    </View>
  );
}
