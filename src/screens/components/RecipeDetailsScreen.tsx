import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

interface RecipeDetailsProps {
  route: {
    params: {
      recipe: {
        id: number;
        title: string;
        description: string;
        portion: number;
        cooking_time: number;
      };
    };
  };
}

const RecipeDetailsScreen: React.FC<RecipeDetailsProps> = ({ route }) => {
  const { recipe } = route.params;
  const navigation = useNavigation();

  const handleSaveRecipe = () => {
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
      // Create SavedRecipes table if it doesn't exist
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS SavedRecipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, portion INTEGER, cooking_time INTEGER)',
        [],
        () => {
          console.log('Table created successfully.');
        },
        error => console.error('Error creating table:', error)
      );

      // Insert the recipe into SavedRecipes table
      tx.executeSql(
        'INSERT INTO SavedRecipes (title, description, portion, cooking_time) VALUES (?, ?, ?, ?)',
        [recipe.title, recipe.description, recipe.portion, recipe.cooking_time],
        () => {
          console.log('Recipe saved successfully.');
          // Navigate to SaveRecipeScreen after saving the recipe
          navigation.navigate('Save');
        },
        error => console.error('Error saving recipe:', error)
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.details}>Description: {recipe.description}</Text>
      <Text style={styles.details}>Portion: {recipe.portion}</Text>
      <Text style={styles.details}>Cooking Time: {recipe.cooking_time} minutes</Text>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#FB9400',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeDetailsScreen;
