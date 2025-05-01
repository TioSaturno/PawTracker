import { useEffect, useState} from "react"
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Platform } from "react-native"
//import MAPA 
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, Map, Settings, Bell } from "lucide-react-native"
import * as Notifications from 'expo-notifications'
import axios from "axios" 
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ThresholdSettings } from "./components/ThresholdSettings"
import { DeviceStatus } from "./components/DeviceStatus"
import { NotificationHistory } from "./components/NotificationHistory"

Notifications.setNotificacionesHandler({
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

  useEffect() => {
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
        }
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
  }
}