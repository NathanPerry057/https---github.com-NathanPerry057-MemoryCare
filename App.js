/*_             
|\ |  _. _|_ |_   _. ._    |_) _  ._ ._   
| \| (_|  |_ | | (_| | |   |  (/_ |  | \/ 
                                       /
*/  


import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainContainer from './src/MainContainer';
import MemoryGamesScreen from './src/screens/MemoryGamesScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import RelaxationHubScreen from './src/screens/RelaxationHubScreen';
import PhotoAlbumScreen from './src/screens/PhotoAlbumScreen';
import { initDatabase } from './src/database/database';
import MeditationScreen from './src/screens/MeditationScreen';
import FingerprintScreen from './src/screens/FingerprintAuthScreen/FingerprintScreen';
import BreathingExercisesScreen from './src/screens/BreathingExercisesScreen';



const Stack = createNativeStackNavigator();

const App = () => {
  //Initializes db on startup
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FingerprintScreen'>  
        <Stack.Screen 
          name="FingerprintScreen"
          component={FingerprintScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MainContainer"
          component={MainContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="MemoryGames"
          component={MemoryGamesScreen}
          options={{ title: 'Welcome to the memory game!' }}
        />
        <Stack.Screen 
          name="RelaxationHub"
          component={RelaxationHubScreen}
          options={{ title: 'Welcome to the relaxation Hub!' }}
        />
        <Stack.Screen 
          name="PhotoAlbum"
          component={PhotoAlbumScreen}
          options={{ title: 'Welcome to the photo album!' }}
        />
        <Stack.Screen 
          name="Meditation"
          component={MeditationScreen}
          options={{ title: 'Meditation' }}
        />
        <Stack.Screen 
          name="BreathingExercises"
          component={BreathingExercisesScreen}
          options={{ title: 'Breathing Exercise' }}
        />
        {}
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