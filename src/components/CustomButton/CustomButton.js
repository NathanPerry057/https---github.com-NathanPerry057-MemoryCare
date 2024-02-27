import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'

const CustomButton = ({onPress, text, type}) => {
    return (
        <Pressable onPress={onPress} 
        style={[styles.container, styles[`container_${type}`]]}>
            <Text 
            style={[styles.text, styles[`text_${type}`]]}>{text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
       backgroundColor: '#DA70D6',
       
        width: 150,

        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,

        alignItems: 'center',
        borderRadius: 100,
    },

    container_PRIMARY: {
        backgroundColor: '',
    },


    container_TERTIARY: {
        backgroundColor: '#DCDCDC',
    },

    container_SECONDARY: {
        backgroundColor: 'blue',
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: '#696969',
    },
    text_SECONDARY: {
        color: 'white',
    },
});

export default CustomButton