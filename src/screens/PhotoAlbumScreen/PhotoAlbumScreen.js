import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';

const PhotoAlbumScreen = () => {
    const [cameraReady, setCameraReady] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const takePicture = async () => {
      if (cameraRef.current) {
        try {
          const { uri } = await cameraRef.current.takePictureAsync();
          console.log('Image captured:', uri);
          // Save image logic here
          Alert.alert('Image captured!', `Image saved to: ${uri}`);
        } catch (error) {
          console.error('Failed to take picture:', error);
          Alert.alert('Error', 'Failed to take picture. Please try again.');
        }
      }
    };
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'row' }}>
          <View style={{ 
            width: 300, 
            height: 500, 
            overflow: 'hidden', 
            borderRadius: 30, 
            shadowColor: 'black',
            shadowOffset: {width: 30, height: 30},
            shadowOpacity: 2,
            shadowRadius: 10,
            elevation: 15, 
        }}>
            <Camera
              ref={cameraRef}
              style={{ flex: 1 }}
              type={Camera.Constants.Type.back}
              onCameraReady={() => setCameraReady(true)}
            />
          </View>
          <Button title="Take Picture" onPress={takePicture} disabled={!cameraReady} />
        </View>
      );
    };
    
    export default PhotoAlbumScreen;