import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const SmallCustomButton = ({ onPress, children, iconName, text }) => {
    return (
      <Pressable onPress={onPress} style={styles.container}>
        <LinearGradient
          colors={['#0e1c26', '#7d7cf9', '#7d7cf9']} 
          style={styles.gradient}
        >
          {iconName && <Icon name={iconName} size={16} color="white" style={styles.icon} />}
          <Text style={styles.text}>{text}</Text>
        </LinearGradient>
      </Pressable>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: 150, 
      borderRadius: 15,
      overflow: 'hidden', 
      elevation: 5,
      marginBottom: 10, 
    },
    gradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10, 
      paddingHorizontal: 10, 
    },
    icon: {
      marginRight: 10, 
      fontSize: 20, 
    },
    text: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 14, 
    },
  });
  
  export default SmallCustomButton;