import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Wifi, MapPin } from "lucide-react-native"

export const DeviceStatus = ({deviceData, customThreshold, fixedThreshold}) => {
    const getSignalStrength = (rssi) => {
        if (rssi >= -65) return "Excelente"
        if (rssi >= -75) return "Buena"
        if (rssi >= -85) return "Regular"
        if (rssi >= fixedThreshold) return "Debil"
        return "Critica"
    }

    const getSignalColor = (rssi) => {
        if (rssi >= -65) return "#00000"
        if (rssi >= -75) return "#00000"
        if (rssi >= -85) return "#00000"
        if (rssi >= fixedThreshold) return "#00000"
        return "#000000"
    }

    const getWifiIcon = (rssi) => {
        const color = getSignalColor(rssi)
        return <Wifi size={24} color = {color} />
    }

    const getModeIcon = (rssi) => {
        const color = mode === "active" ? "#00000" : "#00000"
        return <Wifi size={24} color={color}/>
    }
    return (
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Estado del Dispositivo</Text>
    
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              {getWifiIcon(deviceData.rssi)}
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>Señal WiFi:</Text>
                <Text style={[styles.statusValue, { color: getSignalColor(deviceData.rssi) }]}>
                  {getSignalStrength(deviceData.rssi)} ({deviceData.rssi} dBm)
                </Text>
              </View>
            </View>
    
            <View style={styles.statusItem}>
              {getModeIcon(deviceData.mode)}
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>Modo GPS:</Text>
                <Text style={[styles.statusValue, { color: deviceData.mode === "active" ? "#4CAF50" : "#FFC107" }]}>
                  {deviceData.mode === "active" ? "Activo" : "Sleep"}
                </Text>
              </View>
            </View>
          </View>
    
          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>Ubicación Actual:</Text>
            {deviceData.latitude && deviceData.longitude ? (
              <Text style={styles.locationText}>
                {deviceData.latitude.toFixed(6)}, {deviceData.longitude.toFixed(6)}
              </Text>
            ) : (
              <Text style={styles.locationText}>Esperando datos de ubicación...</Text>
            )}
          </View>
    
          <View style={styles.thresholdContainer}>
            <Text style={styles.thresholdTitle}>Umbrales Configurados:</Text>
            <View style={styles.thresholdItem}>
              <View style={[styles.thresholdIndicator, { backgroundColor: "#FFC107" }]} />
              <Text style={styles.thresholdText}>Primer umbral: {customThreshold} dBm</Text>
            </View>
            <View style={styles.thresholdItem}>
              <View style={[styles.thresholdIndicator, { backgroundColor: "#F44336" }]} />
              <Text style={styles.thresholdText}>Segundo umbral: {fixedThreshold} dBm</Text>
            </View>
          </View>
    
          <Text style={styles.lastUpdate}>Última actualización: {deviceData.lastUpdate || "Nunca"}</Text>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
      },
      statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
      },
      statusItem: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      },
      statusTextContainer: {
        marginLeft: 8,
      },
      statusLabel: {
        fontSize: 14,
        color: "#666",
      },
      statusValue: {
        fontSize: 16,
        fontWeight: "bold",
      },
      locationContainer: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
      },
      locationTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 4,
      },
      locationText: {
        fontSize: 16,
      },
      thresholdContainer: {
        marginBottom: 16,
      },
      thresholdTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
      },
      thresholdItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
      },
      thresholdIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
      },
      thresholdText: {
        fontSize: 14,
      },
      lastUpdate: {
        fontSize: 12,
        color: "#666",
        fontStyle: "italic",
        textAlign: "right",
      },
    })