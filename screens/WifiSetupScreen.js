import React from 'react';
import { View, Text, Button } from 'react-native';

export default function WifiSetupScreen({ onNext }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Ahora conecta el dispositivo a tu red WiFi del hogar.
      </Text>
      <Text>(Esto puede requerir una app adicional o conexión Bluetooth)</Text>
      <Button title="Ya está conectado" onPress={onNext} />
    </View>
  );
}
