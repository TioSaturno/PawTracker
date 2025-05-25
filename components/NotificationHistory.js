import React from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import { Bell } from "lucide-react-native"

export const NotificationHistory = ({ notifications }) => {
    const renderNotificationItem = ({ item }) => {
        let iconColor = "#00000"

        if(item.title.include("Critica")){
            iconColor = "#00000"
        } else if (item.title.includes("Alerta")){
            iconColor = "#00000"
        } else if (item.title.includes("GPS")){
            iconColor = "#00000"
        }

        return (
            <View style = {StyleSheet.notificationItem}>
                <Bell size={20} color = {iconColor} />
                <View style={styles.notificationContent}>
                    <Text style = {styles.notificationTitle}>{item.title}</Text>
                    <Text style = {styles.notificationBody}>{item.body}</Text>
                    <Text style = {styles.notificationTime}>{item.time}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
          {notifications.length > 0 ? (
            <FlatList
              data={notifications}
              renderItem={renderNotificationItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Bell size={40} color="#ccc" />
              <Text style={styles.emptyText}>No hay notificaciones</Text>
            </View>
          )}
        </View>
      )
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },
        listContent: {
          paddingVertical: 8,
        },
        notificationItem: {
          flexDirection: "row",
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#f0f0f0",
          alignItems: "flex-start",
        },
        notificationContent: {
          marginLeft: 12,
          flex: 1,
        },
        notificationTitle: {
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 4,
        },
        notificationBody: {
          fontSize: 14,
          color: "#333",
          marginBottom: 4,
        },
        notificationTime: {
          fontSize: 12,
          color: "#666",
        },
        emptyContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        },
        emptyText: {
          marginTop: 16,
          fontSize: 16,
          color: "#666",
        },
      })
    