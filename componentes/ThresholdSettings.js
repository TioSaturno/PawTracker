import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Slider from "@react-native-community/slider";

export const ThresholdSettings = ({ customThreshold, fixedThreshold, onSaveThreshold }) => {
    const [threshold, setThreshold] = useState(customThreshold);

    const handleSave = () => {
        if (threshold >= fixedThreshold) {
            onSaveThreshold(threshold);
        } else {
            Alert.alert(
                "Valor inválido",
                `El umbral personalizado debe ser mayor que el umbral fijo (${fixedThreshold} dBm)`
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Configuración de Umbrales</Text>

            <View style={styles.thresholdContainer}>
                <Text style={styles.label}>Umbral Personalizado: {threshold} dBm</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={-100}
                    maximumValue={0}
                    step={1}
                    value={threshold}
                    onValueChange={setThreshold}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#000000"
                />
                <Text style={styles.rangeText}>Fuerte (0 dBm) -- Débil (-100 dBm)</Text>
            </View>

            <View style={styles.thresholdInfo}>
                <Text style={styles.infoTitle}>Umbral fijo:</Text>
                <Text style={styles.infoValue}>{fixedThreshold} dBm (No modificable)</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.infoBoxTitle}>¿Cómo funcionan los umbrales?</Text>
                <Text style={styles.infoBoxText}>
                    - Si la señal se sale del umbral fijo ({fixedThreshold} dBm), recibirás una notificación.
                </Text>
                <Text style={styles.infoBoxText}>
                    - Cuando se activa el modo GPS, recibirás una notificación adicional.
                </Text>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar Configuración</Text>
            </TouchableOpacity>
        </View>
    );
};

//CAMBIAR SI ES NECESARIO
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    thresholdContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    slider: {
        width: "100%",
        height: 40,
    },
    rangeText: {
        marginTop: 10,
        fontStyle: "italic",
        color: "#666",
    },
    thresholdInfo: {
        marginBottom: 20,
    },
    infoTitle: {
        fontWeight: "bold",
    },
    infoValue: {
        color: "#333",
    },
    infoBox: {
        padding: 15,
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
        marginBottom: 20,
    },
    infoBoxTitle: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    infoBoxText: {
        fontSize: 14,
        color: "#444",
    },
    saveButton: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
