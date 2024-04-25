import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const FingerprintScreen = ({ navigation }) => {
  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert("Error", "Your device doesn't support biometric authentication.");
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert("Error", "No biometrics are set up on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      cancelLabel: "Cancel",
      fallbackLabel: "Use Passcode",
    });

    if (result.success) {
      navigation.navigate('MainContainer');  // Corrected screen name
    } else {
      Alert.alert("Authentication failed", result.error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Authenticate using your fingerprint</Text>
      <Button title="Authenticate" onPress={authenticate} />
    </View>
  );
};

export default FingerprintScreen;