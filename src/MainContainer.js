import * as React from 'react';
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
    return (
    <Tab.Navigator
        //Startup screen
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === homeName) {
                    iconName = focused ? 'home' : 'home-outline';
                 } else if (route.name === detailsName) {
                    iconName = focused ? 'image' : 'image-outline';
                 } else if (route.name === settingsName) {
                    iconName = focused ? 'settings' : 'settings-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#7d7cf9',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: { paddingBottom: 5, fontSize: 13 },
                tabBarStyle: { padding: 5, height: 70 },
            }
        )
    }
    >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
        </Tab.Navigator>
    );
}