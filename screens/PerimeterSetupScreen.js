import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function PerimeterSetupScreen({ onNext, setRssi }) {
  const [rssiValue, setRssiValue] = useState(null);

  const getRssi = async () => {
    // ⚠️ Esta parte requiere código nativo o BLE si vas a obtener el RSSI real
    const simulatedRssi = -72;
    setRssiValue(simulatedRssi);
    setRssi(simulatedRssi);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18 }}>
        Ve al punto más alejado dentro del perímetro seguro del hogar y presiona el botón.
      </Text>
      <Button title="Guardar intensidad de señal" onPress={getRssi} />
      {rssiValue !== null && (
        <>
          <Text style={{ marginTop: 20 }}>RSSI capturado: {rssiValue} dBm</Text>
          <Button title="Finalizar configuración" onPress={onNext} />
        </>
      )}
    </View>
  );
}