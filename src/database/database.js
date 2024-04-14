import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('photos.db');


export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT);'
    );
  });
};



