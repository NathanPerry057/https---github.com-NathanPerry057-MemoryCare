import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';


const CustomButton = ({ onPress, children, iconName, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            {iconName && <Icon name={iconName} size={20} color="white" style={styles.icon} />}
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#5E239D', // Use a purple gradient background
        width: 300,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 2,
        shadowRadius: 10,
        elevation: 15,
    },
    icon: {
        marginRight: 10,
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
    },
});

export default CustomButton;