import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { db, initDatabase } from '../../database/database';
import CustomButton from '../../components/CustomButton/CustomButton';

const PhotoAlbumScreen = () => {
  const [cameraReady, setCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null); // Add state for camera permission
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // State to track camera type
  const cameraRef = useRef(null); // Create a ref for the camera component

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); 
      setHasPermission(status === 'granted'); 
      initDatabase(); 
    })();
  }, []);

  const takePicture = async () => {
    if (!hasPermission) {
      Alert.alert('Error', 'Camera permission not granted.');
      return;
    }
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('Image captured:', uri);
        savePhotoToDatabase(uri);
        Alert.alert('Success', 'Picture captured and saved!');
      } catch (error) {
        console.error('Failed to take picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const savePhotoToDatabase = (uri) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO photos (uri) VALUES (?);',
        [uri],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Photo saved to database:', uri);
          } else {
            console.error('Failed to save photo to database:', uri);
          }
        }
      );
    });
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={cameraType} 
          onCameraReady={() => setCameraReady(true)}
          ref={cameraRef} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="Take Picture" onPress={takePicture} disabled={!cameraReady} />
        <CustomButton text="Toggle Camera" iconName="camera" onPress={toggleCameraType} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', 
  },
  cameraContainer: {
    width: 300,
    height: 500,
    borderRadius: 15, 
    overflow: 'hidden', 
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOpacity: 0.5, 
    shadowRadius: 3, 
    elevation: 5, 
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20, 
  },
});

export default PhotoAlbumScreen;