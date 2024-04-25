import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function MeditationScreen() {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(null);
    const [playbackDuration, setPlaybackDuration] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState('stopped');


    // Array of meditation tracks
    const meditationTracks = [
        { id: 1, title: 'Calm Mind', uri: 'https://audiomeditation.s3.amazonaws.com/No CopyRight Meditation Music 528Hz - Royalty Free Healing Music.mp3' },
        { id: 2, title: 'Deep Relaxation', uri: 'https://audiomeditation.s3.amazonaws.com/5 Minute Meditation Music - with Earth Resonance Frequency for Deeper Relaxation.mp3' },
        { id: 3, title: 'Stress Relief', uri: 'https://audiomeditation.s3.amazonaws.com/5 Minute Timer - Relaxing Music with Ocean Waves.mp3' }
    ];

    async function playSound(uri) {
        const { sound } = await Audio.Sound.createAsync(
            { uri },
            { shouldPlay: true },
            updateScreenForSoundStatus
        );
        setSound(sound);
        setPlaybackStatus('playing');
        await sound.playAsync();
    }
    
    function updateScreenForSoundStatus(status) {
        setPlaybackPosition(status.positionMillis);
        setPlaybackDuration(status.durationMillis);
        if (!status.isPlaying && status.isLoaded && playbackStatus === 'playing') {
            setPlaybackStatus('paused');
        }
    }

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setPlaybackStatus('paused');
        }
    };

    const resumeSound = async () => {
        if (sound) {
            await sound.playAsync();
            setPlaybackStatus('playing');
        }
    };
    
    const stopSound = async () => {
        if (sound) {
            await sound.stopAsync();
            setPlaybackStatus('stopped');
            setPlaybackPosition(null);
        }
    };

    const formatTime = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };
    
    <Text style={styles.timerText}>
        {formatTime(playbackPosition)} / {formatTime(playbackDuration)}
    </Text>

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
            setIsPlaying(false);
            setPlaybackPosition(null);
            setPlaybackDuration(null);
        } : undefined;
    }, 
    [sound]);

return (
    <View style={styles.container}>
        <Text style={styles.title}>Guided Meditation Tracks</Text>
        {meditationTracks.map((track) => (
            <TouchableOpacity
                key={track.id}
                style={[styles.button, playbackStatus !== 'stopped' ? styles.disabledButton : null]}
                onPress={() => playSound(track.uri)}
                disabled={playbackStatus !== 'stopped'}
            >
                <Text style={styles.buttonText}>{`Play ${track.title}`}</Text>
            </TouchableOpacity>
        ))}
        {(playbackStatus === 'playing' || playbackStatus === 'paused') && (
            <View>
                {playbackStatus === 'playing' && (
                    <TouchableOpacity style={styles.controlButton} onPress={pauseSound}>
                        <Text style={styles.controlButtonText}>Pause</Text>
                    </TouchableOpacity>
                )}
                {playbackStatus === 'paused' && (
                    <TouchableOpacity style={styles.controlButton} onPress={resumeSound}>
                        <Text style={styles.controlButtonText}>Unpause</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.controlButton} onPress={stopSound}>
                    <Text style={styles.controlButtonText}>Stop</Text>
                </TouchableOpacity>
                <Text style={styles.timerText}>
                    {playbackPosition !== null && playbackDuration !== null ?
                        `${formatTime(playbackPosition)} / ${formatTime(playbackDuration)}` :
                        "0:00 / 0:00"}
                </Text>
            </View>
        )}
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
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#0e1c26',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        minWidth: 400,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#bdc3c7',
    },
    controlButton: {
        backgroundColor: '#1abc9c',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        minWidth: 100,
        alignItems: 'center',
    },
    controlButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    timerText: {
        color: '#0e1c26',
        fontSize: 24,
    },
});