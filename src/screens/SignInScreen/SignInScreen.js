import React, {useState} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import Logo from '../../../assets/MemoryCareLogo3.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';


const SignInScreen = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    

const onSignInPressed = () => {
    console.warn("Sign in");
}

const onForgotPasswordPressed = () => {
    console.warn("Forgot password");
}




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

export default SignInScreen