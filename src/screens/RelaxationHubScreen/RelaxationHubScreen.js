import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

export default function RelaxationHubScreen() {
    const navigation = useNavigation();

    const goToMeditation = () => {
        navigation.navigate('Meditation'); 
    };

    const goToBreathingExercises = () => {
        navigation.navigate('BreathingExercises'); 
    };

    return (
        <View style={{flex: 1, 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 24, marginBottom: 100, fontWeight: 'bold' }}>Choose a Relaxation Method</Text>
            <CustomButton 
                onPress={goToMeditation} 
                iconName="medkit" 
                text="Meditation"
            />
            <CustomButton 
                onPress={goToBreathingExercises}
                iconName="heartbeat" 
                text="Breathing Exercises"
            />
        </View>
    );
}