import React from 'react';
import { View, Text, Image } from 'react-native';

export default function ImageViewScreen({ route }) {
    const { imageUri } = route.params; 
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={{ uri: imageUri }} 
                style={{ width: 300, height: 300 }} 
            />
        </View>
    );
}