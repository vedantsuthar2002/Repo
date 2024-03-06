import React, { useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'MainDB.db',
        location: 'default',
    },
    () => {
        console.log('Database opened successfully.');
    },
    error => { console.log('Database not open', error) }
)

const DatabaseInitialization: React.FC = () => {
    useEffect(() => {
        initializeDatabase();
    }, []);

    const initializeDatabase = () => {
        createTables();
    };

    const createTables = () => {
        db.transaction((tx) => {

            // Create Recipes table
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Recipes (ID INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, description TEXT, photos TEXT, portion INTEGER, cooking_time INTEGER, FOREIGN KEY(user_id) REFERENCES Users(ID))',
                [],
                () => console.log('Recipes table created successfully'),
                error => console.error('Error while creating Recipes table:', error)
            );

            // Create Ingredients table
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Ingredients (ID INTEGER PRIMARY KEY AUTOINCREMENT, recipe_id INTEGER, name TEXT, quantity TEXT, FOREIGN KEY(recipe_id) REFERENCES Recipes(ID))',
                [],
                () => console.log('Ingredients table created successfully'),
                error => console.error('Error while creating Ingredients table:', error)
            );
        });
    };

    return null; // This component does not render anything
}

export default DatabaseInitialization;
