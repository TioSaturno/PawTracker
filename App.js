import React, { useState } from 'react';
import { View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import DogNameScreen from './screens/DogNameScreen';
import WifiSetupScreen from './screens/WifiSetupScreen';
import PerimeterSetupScreen from './screens/PerimeterSetupScreen';
import CompletionScreen from './screens/CompletionScreen';

export default function App() {
  const [step, setStep] = useState(0);
  const [dogName, setDogName] = useState('');
  const [rssi, setRssi] = useState(null);

  const screens = [
    <WelcomeScreen onNext={() => setStep(1)} />,
    <DogNameScreen onNext={() => setStep(2)} dogName={dogName} setDogName={setDogName} />,
    <WifiSetupScreen onNext={() => setStep(3)} />,
    <PerimeterSetupScreen onNext={() => setStep(4)} setRssi={setRssi} />,
    <CompletionScreen dogName={dogName} rssi={rssi} />
  ];

  return <View style={{ flex: 1 }}>{screens[step]}</View>;
}
