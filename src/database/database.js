import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('photos.db');

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT);',
      [],
      () => {
        console.log('Table checked/created successfully');
        tx.executeSql(
          'ALTER TABLE photos ADD COLUMN text TEXT;',
          [],
          () => console.log('Column made'),
          (t, error) => {
            if (error.message.includes('duplicate column name: text')) {
              console.log('Column already exists, all good!');
            } else {
              console.log('Error adding column:', error);
            }
          }
        );
      },
      (t, error) => console.log('Error creating table:', error)
    );
  });
};

