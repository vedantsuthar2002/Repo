import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import RecipeDetailsScreen from './RecipeDetailsScreen';
import { useNavigation } from '@react-navigation/native';

interface Recipe {
  id: number;
  title: string;
  description: string;
  portion: number;
  cooking_time: number;
}

const SaveRecipeScreen: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = () => {
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
        'SELECT * FROM SavedRecipes',
        [],
        (_, { rows }) => {
          const data: Recipe[] = [];
          for (let i = 0; i < rows.length; i++) {
            const { ID, title, description, portion, cooking_time } = rows.item(i);
            data.push({ id: ID, title, description, portion, cooking_time });
          }
          setSavedRecipes(data);
        },
        error => console.error('Error fetching saved recipes:', error)
      );
    });
  };
  const handleRecipePress = (recipe: Recipe) => {
    // Navigate to RecipeDetailsScreen and pass the recipe as a parameter
    console.log("details", RecipeDetailsScreen);
    navigation.navigate('RecipeDetails', { recipe });
  };


  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeDescription}>{item.description}</Text>
      <Text style={styles.recipeDetails}>Portion: {item.portion}</Text>
      <Text style={styles.recipeDetails}>Cooking Time: {item.cooking_time} minutes</Text>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Recipes</Text>
      <FlatList showsVerticalScrollIndicator={false}
        data={savedRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
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

export default SaveRecipeScreen;
