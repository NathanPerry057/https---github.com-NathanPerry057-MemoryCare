import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import 'react-native-gesture-handler';

//Screens
import HomeScreen from './screens/HomeScreen/HomeScreen';
import DetailsScreen from './screens/DetailsScreen/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';


// Screen names
const homeName = 'Home';
const detailsName = 'Details';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if(rn === homeName) {
                iconName = focused ? 'home' : 'home-outline';
            } else if (rn === detailsName) {
                iconName = focused ? 'list' : 'list-outline';
            } else if (rn === settingsName) {
                iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color='purple' />;
          },
        })}
         >
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={detailsName} component={DetailsScreen} />
            <Tab.Screen name={settingsName} component={SettingsScreen} />
            </Tab.Navigator>

        </NavigationContainer>
    );
}