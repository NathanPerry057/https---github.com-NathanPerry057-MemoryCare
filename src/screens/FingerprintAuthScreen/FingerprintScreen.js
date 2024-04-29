import React from 'react';
import { View, Text, Alert, Image, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import CustomButton from '../../components/CustomButton/CustomButton';
import MemoryCareLogo from '../../../assets/MemoryCareLogo5.png';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const FingerprintScreen = ({ navigation }) => {

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    //Checks for biometric hardware
    if (!hasHardware) {
      Alert.alert("Error", "Your device doesn't support biometric authentication.");
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      //Checks if user have emrolled biometric data
      Alert.alert("Error", "No biometrics are set up on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      cancelLabel: "Cancel",
    });

    if (result.success) {
      navigation.navigate('MainContainer');
    } else {
      Alert.alert("Authenticate to get started!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to MemoryCare</Text>
      <Image
        source={require('../../../assets/MemoryCareLogo5.png')} 
        style={styles.welcomeImage}
      />
      <Text style={styles.instructions}>
        Tap the button below to log in!
      </Text>
      <CustomButton title="Authenticate" onPress={authenticate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  welcomeImage: {
    width: 300, 
    height: 300, 
    marginBottom: 20,
  }
});

export default FingerprintScreen;