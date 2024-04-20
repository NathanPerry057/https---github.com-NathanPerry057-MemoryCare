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
const detailsName = 'Gallery';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(   
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if(rn === homeName) {
                iconName = focused ? 'home' : 'home-outline';
            } else if (rn === detailsName) {
                iconName = focused ? 'image' : 'image-outline';
            } else if (rn === settingsName) {
                iconName = focused ? 'settings' : 'settings-outline';
            }

           
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}


        tabBarOptions={{
            activeTintColor: 'purple',
            inactiveTintColor: 'black',
            labelStyle: {paddingBottom: 5, fontSize: 13},
            style: {padding: 5, height: 70}
        }}
         >
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={detailsName} component={DetailsScreen} />
            <Tab.Screen name={settingsName} component={SettingsScreen} />
            </Tab.Navigator>
   
    );
}