import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

interface Recipe {
    id: number;
    title: string;
    description: string;
    portion: number;
    cooking_time: number;
}

const MyRecipesScreen: React.FC = () => {
    const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetchUserRecipes();
    }, []);

    const fetchUserRecipes = () => {
        const db = SQLite.openDatabase(
            {
                name: 'MainDB.db',
                location: 'default',
            },
            () => {
                console.log('Database opened successfully.');
            },
            error => {
                console.error('Database not open', error);
            }
        );

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Recipes',
                [],
                (_, { rows }) => {
                    const data: Recipe[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const { ID, title, description, portion, cooking_time } = rows.item(i);
                        data.push({ id: ID, title, description, portion, cooking_time });
                    }
                    setUserRecipes(data);
                },
                error => console.error('Error fetching user recipes:', error)
            );
        });
    };

    const renderRecipeItem = ({ item }: { item: Recipe }) => (
        <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={styles.recipeDescription}>{item.description}</Text>
            <Text style={styles.recipeDetails}>Portion: {item.portion}</Text>
            <Text style={styles.recipeDetails}>Cooking Time: {item.cooking_time} minutes</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Recipes</Text>
            <FlatList
                data={userRecipes}
                renderItem={renderRecipeItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    recipeItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recipeDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    recipeDetails: {
        fontSize: 14,
        color: '#666666',
    },
});

export default MyRecipesScreen;
