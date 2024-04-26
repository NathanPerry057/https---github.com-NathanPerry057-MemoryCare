import React, { useState, useEffect } from 'react';
import { View, Text, Vibration, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import breathe from '../../../assets/breathe.png';


export default function BreathingExercisesScreen() {
    const [isExercising, setIsExercising] = useState(false);
    const [timer, setTimer] = useState(null);
    const [countdown, setCountdown] = useState(8);
    const [breathPhase, setBreathPhase] = useState('');

    useEffect(() => {
        if (isExercising) {
            setBreathPhase('Breathe In');
            const interval = setInterval(() => {
                Vibration.vibrate();
                setCountdown(8);
                setBreathPhase(prevPhase => prevPhase === 'Breathe In' ? 'Breathe Out' : 'Breathe In');
            }, 8000);
            setTimer(interval);
            const countdownInterval = setInterval(() => {
                setCountdown(prevCount => prevCount - 1);
            }, 1000);
            return () => {
                clearInterval(interval);
                clearInterval(countdownInterval);
            };
        } else {
            clearInterval(timer);
            setCountdown(8);
            setBreathPhase('');
        }
    }, [isExercising]);

    const handlePress = () => {
        setIsExercising(!isExercising);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Welcome to the breathing exercise!
            </Text>
            <Image source={breathe} style={styles.breatheImage} />
            <Text style={styles.instructions}>
                Instructions: For each vibration of the phone, breathe in and out. Make yourself comfortable and enjoy!
            </Text>
            {isExercising && (
                <>
                    <Text style={styles.breathPhase}>
                        {breathPhase}
                    </Text>
                    <Text style={styles.countdown}>
                        {countdown} seconds
                    </Text>
                </>
            )}
            <CustomButton 
                title={isExercising ? "Stop Exercise" : "Start Exercise"}
                onPress={handlePress}
                style={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',  
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        top: 20,
        textAlign: 'center',
    },
    instructions: {
        fontSize: 18,
        color: '#555',
        marginTop: 70,
        marginBottom: 40,
        textAlign: 'center',
    },
    breathPhase: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#22577E',  
        marginBottom: 10,
    },
    breatheImage: {
        width: 250,  
        height: 250, 
        marginBottom: 20,
    },
    countdown: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#22577E',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#38A3A5',  
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        minWidth: 200,
        textAlign: 'center',
    }
});