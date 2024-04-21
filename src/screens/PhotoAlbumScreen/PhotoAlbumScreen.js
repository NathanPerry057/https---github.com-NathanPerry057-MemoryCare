import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Alert, StyleSheet, TextInput, Modal, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { db, initDatabase } from '../../database/database';
import CustomButton from '../../components/CustomButton/CustomButton';

const PhotoAlbumScreen = () => {
  const [cameraReady, setCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [modalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState('');
  const [photoText, setPhotoText] = useState('');
  const cameraRef = useRef(null);

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
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri);
        setModalVisible(true); // Show the modal after taking a picture
      } catch (error) {
        console.error('Failed to take picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const savePhotoToDatabase = () => {
    if (!photoUri || !photoText) {
      Alert.alert('Error', 'Photo or description is missing.');
      return;
    }
  
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO photos (uri, text) VALUES (?, ?);',
        [photoUri, photoText],
        (_, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert('Success', 'Picture and text saved!');
          } else {
            Alert.alert('Error', 'Failed to save the picture and text.');
          }
        },
        (t, error) => {
          console.log('Error saving photo and text:', error);
          Alert.alert('Error', 'Failed to save the picture and text.');
        }
      );
    });
    setModalVisible(false);
    setPhotoText('');
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter a description for the photo"
              style={styles.textInput}
              onChangeText={text => setPhotoText(text)}
              value={photoText}
            />
            <Button title="Save" onPress={savePhotoToDatabase} />
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default PhotoAlbumScreen;