

import {StyleSheet, Text, View, TextInput, ScrollView, FlatList, SafeAreaView} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './src/screens/MainContainer';




const App = () => {

  
  return (
    <MainContainer/>
  )
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;