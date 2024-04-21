import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainContainer from './src/MainContainer';
import WelcomeScreen from './src/screens/SetupScreens/WelcomeScreen';
import MemoryGamesScreen from './src/screens/MemoryGamesScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import RelaxationHubScreen from './src/screens/RelaxationHubScreen';
import PhotoAlbumScreen from './src/screens/PhotoAlbumScreen';
import ImageViewScreen from './src/screens/ImageViewScreen';
import * as SQLite from 'expo-sqlite';
import { initDatabase } from './src/database/database';




const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainContainer'>
        <Stack.Screen 
          name="MainContainer"
          component={MainContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }} // Optional: you can customize the header title here
        />
        <Stack.Screen 
          name="MemoryGames"
          component={MemoryGamesScreen}
          options={{ title: 'Memory Games' }} // Optional: you can customize the header title here
        />
        <Stack.Screen 
          name="RelaxationHub"
          component={RelaxationHubScreen} // Add RelaxationHubScreen here
          options={{ title: 'Relaxation Hub' }}
        />
        <Stack.Screen 
          name="PhotoAlbum"
          component={PhotoAlbumScreen} // Add RelaxationHubScreen here
          options={{ title: 'Welcome to the photo album!' }}
        />
        <Stack.Screen 
        name="ImageViewScreen" 
        component={ImageViewScreen} 
        />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;