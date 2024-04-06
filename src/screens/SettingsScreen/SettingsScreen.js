import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

    const toggleNotifications = () => {
        setNotificationsEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Notification Settings</Text>
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

            {/* Add more settings items here */}
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    settingText: {
        fontSize: 16,
    },
});

export default SettingsScreen;