/*import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, Alert} from 'react-native'
import Logo from '../../../assets/MemoryCareLogo3.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import FingerprintScanner from 'react-native-fingerprint-scanner';



const SignInScreen = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    

const onSignInPressed = () => {
    console.warn("Sign in");
}

const onForgotPasswordPressed = () => {
    console.warn("Forgot password");
}



const authenticateWithFingerprint = () => {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        if(biometryType === 'Touch ID' || biometryType === 'Face ID') {
            FingerprintScanner.authenticate({
                description: 'FINGERPRINT', 
            })
             .then(() => {
                Alert.alert('Authentication GREAT SUCCESS', 'GWAN BAI');
             })
             .catch((error) => {
                console.error('Fingerprint authentication failed:', error);
                Alert.alert('Authentication failed', 'Please try again or use another authentication method.');
             });
        } else {
            Alert.alert('Biometric sensor not available', 'Please use another authentication method.');
        }
      })
       .catch((error) => console.error('nope',error));
    };

    return (
    <View style={styles.root}>
      <Image
       source={Logo}
        style={styles.logo}
         resizeMode="contain"
         />

         <CustomInput 
         placeholder="Username" 
         value= {username} 
         setValue={setUsername}
         />
         <CustomInput 
         placeholder= "Password" 
         value= {password} 
         setValue={setPassword}
         secureTextEntry={true}
         />

         <CustomButton 
         text="Sign in" 
         onPress={onSignInPressed}
         />

         <CustomButton 
         text="Forgot password" 
         onPress={onForgotPasswordPressed}
         type= "TERTIARY"
         />

        <CustomButton
        text="Use Fingerprint" 
        onPress={authenticateWithFingerprint} 
        type="SECONDARY" 
        /> 
    </View>
    );
};

const styles = StyleSheet.create({

    root: {
        alignItems: 'center',
        padding: 150,
    },

    logo: {
        width: 200,
        maxWidth: 300,
        height: 200, 
    },
});




export default SignInScreen*/