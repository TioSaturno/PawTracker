import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';

const WiFiConfigScreen = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [espAvailable, setEspAvailable] = useState(false);

  // Verifica conexión con el ESP32 (SoftAP)
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('http://192.168.4.1', { method: 'GET' });
        if (res.ok) {
          setEspAvailable(true);
        } else {
          setEspAvailable(false);
        }
      } catch (e) {
        setEspAvailable(false);
      } finally {
        setChecking(false);
      }
    };

    checkConnection();
  }, []);

  const sendCredentials = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.4.1/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `ssid=${encodeURIComponent(ssid)}&password=${encodeURIComponent(password)}`
      });

      const text = await response.text();
      setLoading(false);

      if (response.ok) {
        Alert.alert('✅ Éxito', 'Datos enviados. El dispositivo intentará conectarse.');
      } else {
        Alert.alert('❌ Error', `Respuesta inesperada: ${text}`);
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('❌ Error de red', err.message);
    }
  };

  // Mostrar pantalla de carga mientras se verifica conexión
  if (checking) {
    return (
      <View style={{ padding: 20 }}>
        <Text>🔍 Verificando conexión con el collar...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Si no hay conexión con el ESP32
  if (!espAvailable) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 16, color: 'red' }}>
          ❌ No se pudo conectar al collar.
        </Text>
        <Text style={{ marginTop: 10 }}>
          Asegúrate de estar conectado a la red WiFi del collar: <Text style={{ fontWeight: 'bold' }}>"Collar_Config"</Text>
        </Text>
      </View>
    );
  }

  // Si hay conexión, mostrar formulario
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>📶 Configurar WiFi del Collar</Text>

      <Text>Nombre de tu red (SSID):</Text>
      <TextInput
        value={ssid}
        onChangeText={setSsid}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="Ej: MiCasaWiFi"
      />

      <Text>Contraseña:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
        placeholder="Contraseña"
      />

      <Button
        title={loading ? 'Enviando...' : 'Enviar al collar'}
        onPress={sendCredentials}
        disabled={loading}
      />
    </View>
  );
};

export default WiFiConfigScreen;
