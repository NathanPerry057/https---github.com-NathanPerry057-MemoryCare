import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button, Alert } from 'react-native';
import { db } from '../../database/database';

const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const toggleNotifications = () => {
        setNotificationsEnabled(previousState => !previousState);
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
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Delete All Photos</Text>
                <Button
                    title="Delete"
                    onPress={confirmDeletion}
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