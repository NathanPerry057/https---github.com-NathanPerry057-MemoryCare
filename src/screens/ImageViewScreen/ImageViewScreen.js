import React from 'react';
import { View, Text, Image } from 'react-native';

export default function ImageViewScreen({ route }) {
    const { imageUri } = route.params; // Get the image URI from route parameters
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={{ uri: imageUri }} // Set the source to the captured image URI
                style={{ width: 300, height: 300 }} // Set width and height as needed
            />
        </View>
    );
}