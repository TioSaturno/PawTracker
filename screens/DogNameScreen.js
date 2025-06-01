import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function DogNameScreen({ dogName, setDogName, onNext }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18 }}>¿Cómo se llama tu perro?</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 20 }}
        value={dogName}
        onChangeText={setDogName}
        placeholder="Nombre del perro"
      />
      <Button title="Continuar" onPress={onNext} disabled={!dogName} />
    </View>
  );
}