import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        backgroundColor: 'purple',
        width: 200,
        paddingVertical: 15,
        paddingHorizontal: 20, 
        marginVertical: 10,
        marginLeft: 0,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    icon: {
        marginRight: 10, 
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CustomButton;