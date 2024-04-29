import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Vibration, StyleSheet, Alert } from 'react-native';
import { db } from '../../database/database';
import { shuffleArray } from '../ShuffleArray/shuffleArray';

export default function MemoryGamesScreen() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textOptions, setTextOptions] = useState([]);
    const [matches, setMatches] = useState(0);

    useEffect(() => {
        fetchItems();
    }, []);


    const fetchItems = () => {
        db.transaction(tx => {
            tx.executeSql(
                //Fetches rows from table
                'SELECT * FROM photos;',
                //Param for sql query
                [],
                (_, { rows }) => {
                    const data = [];
                    for (let i = 0; i < rows.length; i++) {
                        data.push(rows.item(i));
                    }
                    //Shufflearray.js is called to randomize the order of photos
                    const shuffledData = shuffleArray(data);
                    setSelectedImage(shuffledData[0]); 
                    //Shuffles first three items of shuffled data
                    setTextOptions(shuffleArray(shuffledData.slice(0, 3).map(item => item.text))); 
                },
                (t, error) => {
                    console.log('Error fetching photos:', error);
                }
            );
        });
    };




    const handleSelectText = (text) => {
    //Checks if text matches selectedimage
    if (selectedImage.text === text) {
        const newMatches = matches + 1;
        setMatches(newMatches);
        if (newMatches % 5 === 0) {
            Alert.alert("Well done!", `You've found ${newMatches} matches! Keep going!`);
            Vibration.vibrate();
        } else {
            Alert.alert("Match!", "Good job!");
            Vibration.vibrate();
        }
        fetchItems();
    } else {
        Alert.alert("Wrong match", "Try again!");
        Vibration.vibrate();
    }
};

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Memory Game</Text>
            <Text style={styles.subheader}>Matches found: {matches}</Text>
            {selectedImage && <Image source={{ uri: selectedImage.uri }} style={styles.image} />}
            <View style={styles.optionsContainer}>
                {textOptions.map((text, index) => (
                    <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelectText(text)}>
                        <Text style={styles.optionText}>{text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',  
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2C3E50', 
        marginBottom: 20,
    },
    subheader: {
        fontSize: 18,
        color: '#7f8c8d',  
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,  
        resizeMode: 'cover',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    optionsContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',  
        paddingHorizontal: 20,
    },
    option: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'grey',  
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    optionText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',  
    },
});