

import {StyleSheet, Text, View, TextInput, ScrollView, FlatList, SafeAreaView} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './src/MainContainer';
import WelcomeScreen from './src/screens/SetupScreens/WelcomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='WelcomeScreen'
      >
        <Stack.Screen 

          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown:false}}
        >
        </Stack.Screen>
      </Stack.Navigator>
    
    <MainContainer/>



    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;