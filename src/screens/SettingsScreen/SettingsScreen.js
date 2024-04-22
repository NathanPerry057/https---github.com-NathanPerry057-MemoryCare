import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Button, Alert } from 'react-native';
import { db } from '../../database/database';
import * as Notifications from 'expo-notifications';
import { Picker } from '@react-native-picker/picker';


const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [notificationInterval, setNotificationInterval] = useState('5');

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            Alert.alert(notification.request.content.title, notification.request.content.body);
        });
    
        return () => subscription.remove();
    }, []);

    const handleNotificationChange = async (itemValue) => {
        setNotificationInterval(itemValue);
        if (notificationsEnabled) {
            await Notifications.cancelAllScheduledNotificationsAsync();
            scheduleNotification(itemValue);
        }
    };

    const scheduleNotification = async (interval) => {
        const seconds = {
            '5': 5, // 5 seconds
            '3h': 10800, // 3 hours
            '6h': 21600, // 6 hours
            '9h': 32400, // 9 hours
            '12h': 43200, // 12 hours
            '24h': 86400, // 24 hours
        };


    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Reminder!",
            body: 'Remember to take a photo using the photo album!!',
        },
        trigger: {
            seconds: seconds[interval],
            repeats: true
        },
    });
};
    

    const registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        console.log("Current Permission Status:", existingStatus);
        
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            console.log("New Permission Status:", finalStatus);
        }
        
        if (finalStatus === 'granted') {
            const tokenData = await Notifications.getExpoPushTokenAsync();
            console.log("Expo Push Token:", tokenData.data);
        } else {
            Alert.alert('Failed to get push token for push notification!');
        }
    };


    const toggleNotifications = async () => {
        const newState = !notificationsEnabled;
        setNotificationsEnabled(newState);
        if (newState) {
            scheduleNotification(notificationInterval);
        } else {
            await Notifications.cancelAllScheduledNotificationsAsync();
        }
    };

    const confirmDeletion = () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete all photos?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel"
                },
                { 
                    text: "Yes", onPress: deleteAllPhotos
                }
            ]
        );
    };

    const deleteAllPhotos = () => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM photos;',
                [],
                (_, { rowsAffected }) => {
                    if (rowsAffected > 0) {
                        Alert.alert('Delete successful', 'All photos have been deleted.');
                    }
                },
                (t, error) => {
                    Alert.alert('Delete failed', 'Failed to delete photos.');
                    console.error(error);
                }
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    thumbColor={notificationsEnabled ? "#5E239D" : "white"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotifications}
                    value={notificationsEnabled}
                />
            </View>
            {notificationsEnabled && (
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Notification Interval</Text>
                    <Picker
                        selectedValue={notificationInterval}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => handleNotificationChange(itemValue)}>
                        <Picker.Item label="5 Seconds" value="5" />
                        <Picker.Item label="3 Hours" value="3h" />
                        <Picker.Item label="6 Hours" value="6h" />
                        <Picker.Item label="9 Hours" value="9h" />
                        <Picker.Item label="12 Hours" value="12h" />
                        <Picker.Item label="24 Hours" value="24h" />
                    </Picker>
                </View>
            )}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Delete All Photos</Text>
                <Button
                    title="Delete"
                    onPress={() => confirmDeletion()}
                    color="red"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    settingText: {
        fontSize: 18,
    },
});

export default SettingsScreen;