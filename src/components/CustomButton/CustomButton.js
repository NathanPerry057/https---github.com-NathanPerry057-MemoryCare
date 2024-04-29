import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


const CustomButton = ({ title, onPress, iconName, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <LinearGradient
                colors={['#0e1c26', '#7d7cf9', '#7d7cf9']} 
                style={styles.gradient}>
                {iconName && <Icon name={iconName} size={20} color="white" style={styles.icon} />}
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300, 
        borderRadius: 25,
        overflow: 'hidden', 
        elevation: 5,
        marginBottom: 10, 
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

