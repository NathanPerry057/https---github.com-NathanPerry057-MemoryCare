import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { db } from '../../database/database';
import { LinearGradient } from 'expo-linear-gradient';


const DetailsScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPhotos();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchPhotos = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM photos;',
        [],
        (_, { rows }) => {
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          setPhotos(data);
        },
        (t, error) => {
          console.log('Error fetching photos:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Gallery</Text>
      </View>
      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
            <View style={styles.textBox}>
              <Text style={styles.text}>{item.text ? item.text.toString() : "No description"}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  photoContainer: {
    marginVertical: 10,
  },
  photo: {
    width: 350,
    height: 500,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  textBox: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginTop: 0, 
    alignSelf: 'center',
    maxWidth: '90%', 
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center', 
  },
});

export default DetailsScreen;