import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

export default function RelaxationHubScreen() {
    const navigation = useNavigation();

    const goToMeditation = () => {
        navigation.navigate('Meditation'); // Ensure the route name matches your navigation setup
    };

    const goToBreathingExercises = () => {
        navigation.navigate('BreathingExercises'); // Ensure the route name matches your navigation setup
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Choose a Relaxation Method</Text>
            <CustomButton 
                onPress={goToMeditation} 
                iconName="medkit" // Choose an icon that best represents meditation
                text="Meditation"
            />
            <CustomButton 
                onPress={goToBreathingExercises}
                iconName="heartbeat" // Choose an icon that best represents breathing exercises
                text="Breathing Exercises"
            />
        </View>
    );
}