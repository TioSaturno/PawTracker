import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [gpsActivo, setGpsActivo] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [watcher, setWatcher] = useState(null);

  // Activar GPS y actualizar ubicación en tiempo real
  const activarGPS = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso para acceder a la ubicación fue denegado');
      return;
    }

    const watchId = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // cada 5 segundos
        distanceInterval: 5, // o cada 5 metros
      },
      (loc) => {
        setLocation(loc); // Actualiza posición
      }
    );

    setWatcher(watchId);
  };

  useEffect(() => {
    if (gpsActivo) {
      activarGPS();
    }

    return () => {
      if (watcher) {
        watcher.remove();
      }
    };
  }, [gpsActivo]);

  let locationText = 'Esperando activación de GPS...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Latitud: ${location.coords.latitude}\nLongitud: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: "https://static.wikia.nocookie.net/omegia/images/4/49/TungTungTungSahur.jpg/revision/latest?cb=20250331233111&path-prefix=es" }}
        style={{ width: 503, height: 758 }}
      />
      <StatusBar style="auto" />
      <Text>TUNG TUNG TUNG SAHUR</Text>
      <Text>{locationText}</Text>

      <Button 
        title="Simular escape"
        onPress={() => setGpsActivo(true)}
      />
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
