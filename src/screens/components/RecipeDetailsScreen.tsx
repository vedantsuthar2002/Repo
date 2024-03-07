import React, { useEffect, useState } from 'react';
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
  const [recipeAlreadySaved, setRecipeAlreadySaved] = useState<boolean>(false);

  useEffect(() => {
    checkIfRecipeAlreadySaved();
  }, []);

  const checkIfRecipeAlreadySaved = () => {
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
        'SELECT * FROM SavedRecipes WHERE title = ?',
        [recipe.title],
        (_, { rows }) => {
          if (rows.length > 0) {
            setRecipeAlreadySaved(true);
          }
        },
        error => console.error('Error checking if recipe already saved:', error)
      );
    });
  };

  const handleSaveRecipe = () => {
    if (!recipeAlreadySaved) {
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
        // Insert the recipe into SavedRecipes table
        tx.executeSql(
          'INSERT INTO SavedRecipes (title, description, portion, cooking_time) VALUES (?, ?, ?, ?)',
          [recipe.title, recipe.description, recipe.portion, recipe.cooking_time],
          () => {
            console.log('Recipe saved successfully.');
            setRecipeAlreadySaved(true); // Set flag indicating recipe is saved
            // Navigate to SaveRecipeScreen after saving the recipe
            navigation.navigate('Save');
          },
          error => console.error('Error saving recipe:', error)
        );
      });
    } else {
      console.log('Recipe already saved.');
      // Show a message to the user indicating that the recipe is already saved
    }
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
