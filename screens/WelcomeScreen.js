import React from 'react';
import { View, Text, Button } from 'react-native';

export default function WelcomeScreen({ onNext }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Bienvenido a PawTracker</Text>
      <Button title="Comenzar" onPress={onNext} />
    </View>
  );
}