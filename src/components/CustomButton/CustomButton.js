import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


const CustomButton = ({ onPress, children, iconName, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <LinearGradient
                colors={['#3A1C71', '#D76D77', '#FFAF7B']} // Use the same color for both start and end points
                style={styles.gradient}>
                {iconName && <Icon name={iconName} size={20} color="white" style={styles.icon} />}
                <Text style={styles.text}>{text}</Text>
            </LinearGradient>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300, // Set the fixed width of the button
        borderRadius: 25,
        overflow: 'hidden', // Ensure gradient doesn't overflow the button
        elevation: 5,
        marginBottom: 10, // Add margin bottom to separate buttons
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    icon: {
        marginRight: 15,
        fontSize: 30
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
    },
});

export default CustomButton;

