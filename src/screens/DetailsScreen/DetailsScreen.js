import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { db } from '../../database/database';

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
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Gallery</Text>
      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
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
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photoContainer: {
    marginVertical: 10,
  },
  photo: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 20,
    shadowColor: 'black',
    
  },
});

export default DetailsScreen;