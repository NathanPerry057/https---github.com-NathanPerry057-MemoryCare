import * as React from 'react';



import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons';
import 'react-native-gesture-handler';

//Screens
import HomeScreen from '../src/screens/HomeScreen';
import SettingsScreen from '../src/screens/SettingsScreen/SettingsScreen';
import DetailsScreen from '../src/screens/DetailsScreen/DetailsScreen';

// Screen names
const homeName = 'Home';
const detailName = 'Details';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
            
            </Tab.Navigator>

        </NavigationContainer>
    );
}