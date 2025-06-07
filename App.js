import { useEffect, useState} from "react"
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Platform, SafeAreaProvider, View, StatusBar } from "react-native"
import { Main } from "./components/main" 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as Notifications from 'expo-notifications'
import axios from "axios" 
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ThresholdSettings } from "./components/ThresholdSettings"
import { DeviceStatus } from "./components/DeviceStatus"
import { NotificationHistory } from "./components/NotificationHistory"
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    notificacionAlerta: true, 
    notificacionSonido: true, 
    notificacionBadge: true, 
  }),
})

const Tab = createBottomTabNavigator()

//URL del servidor ESP32
const API_URL = ""

export default function App() {
  
  const [expoPushToken, setExpoPushToken] = useState("")
  const [deviceData, setDeviceData] = useState({
    latitude: 0,
    longitude: 0,
    rssi: 0,
    mode: "sleep", 
    lastUpdate: "",
  })
  const [customThreshold, setCustomThreshold] = useState () //aca deberia estar la función del umbral personalizado 
  const [fixedThreshold] = useState(-100)
  const [NotificationHistory, setNotificationHistory] = useState([])

  useEffect(() => {
    registerForPushNotificationAsync().then((token) => setExpoPushToken(token))
    
    loadCustomThreshold()

    const notificationListener = 
    Notification.addNotificationReceivedListener((notification) => {
      const notificationData = notification.request.content 
      setNotificationHistory((prev) => [
        {
          id: notification.request.identifier, 
          title: notificationData.title, 
          body: notificationData.body, 
          time: new Date().toLocaleString(),
        },
        ...prev,
      ])
    })

    const interval = setInterval(() => {
      fetchDeviceData()
    }, 30000)

    return () => {
      clearInterval(interval)
      Notifications.removeNotificationSubscripcion(notificationListerner)
    }
  }, [])

  useEffect(() => {
    if(deviceData.rssi !== 0){
      checkThresholds()
    }
  }, [deviceData])

  const loadCustomThreshold = async () => {
    try {
      const value = await AsyncStorage.getItem("customThreshold")
      if (value !== null){
        setCustomThreshold(Number.parseInt(value))
      }
    } catch (error){
      console.error("Error en cargar el Threshold", error)
    }
  }

  const saveCustomThreshold = async(value) => {
    try {
      await AsyncStorage.setItem("customThreshold", value.toString())
      setCustomThreshold(value)

      try{
        await axios.post(`${API_URL}/device/settings`, {
          command: `SET_THRESHOLD:${value}`,
        })
        Alert.alert("Exito", "Umbral actualizado en el dispositivo")
      } catch (error) {
        console.error("Error en el update del dispositovo Threshold:", error)
        Alert.alert("Error", "No se pudo actualizar el umbral en el dispositivo")
      }
    } catch (error){
      console.error("Error en el guardar el threshold", error)
    }
  }

  const fetchDeviceData = async () => {
    try {
      const response = await axios.get(`${API_URL}/device/status`)
      const data = response.data

      setDeviceData({
        latitude: data.latitude, 
        longitude: data.longitude, 
        rssi: data.rssi, 
        mode: data.mode, 
        lastUpdate: new Date().toLocaleString(),
      })

      if(data.mode == "active" && deviceData.mode === "active"){
        sendNotification("GPS activado: El GPS se ha activado.")

        setTimeout(() => {
          sendNotification("¡Tu perro ha salido de tu red WIFI!", "Siga a tu perro")
        }, 5000)
      }
    } catch (error){
      console.error("Error en obtener datos en el dispositivo", error)
    }
  }

  const checkThresholds = () => {
    const { rssi } = devideData

    if(rssi <= customThreshold && rssi > fixedThreshold){
      sendNotification("¡Tu perro ha salido del primer umbral!")
    }

    if(rssi <= fixedThreshold){
      sendNotification("¡Tu perro ha salido del segundo umbral!")
    }
  }

  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title, 
        body, 
        sound: true, 
        priority: Notifications.AndroidNotificationPriority.HIGH,
      }, 
      trigger: null,
    })
  }
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
    alignItems: 'center',
    justifyContent: 'center',
  }
});
