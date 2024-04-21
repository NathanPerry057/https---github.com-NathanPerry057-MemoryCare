import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function MeditationScreen() {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    // Array of meditation tracks
    const meditationTracks = [
        { id: 1, title: 'Calm Mind', uri: 'https://link-to-your-audio-file1.mp3' },
        { id: 2, title: 'Deep Relaxation', uri: 'https://link-to-your-audio-file2.mp3' },
        { id: 3, title: 'Stress Relief', uri: 'https://link-to-your-audio-file3.mp3' }
    ];

    async function playSound(uri) {
        const { sound } = await Audio.Sound.createAsync(
            { uri },
            { shouldPlay: true }
        );
        setSound(sound);

        await sound.playAsync();
        setIsPlaying(true);
    }

    useEffect(() => {
        // Unload sound when the component is unmounted
        return sound ? () => {
            sound.unloadAsync();
            setIsPlaying(false);
        } : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Guided Meditation Tracks</Text>
            {meditationTracks.map((track) => (
                <Button
                    key={track.id}
                    title={`Play ${track.title}`}
                    onPress={() => playSound(track.uri)}
                    disabled={isPlaying}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    }
});