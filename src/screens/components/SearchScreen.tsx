import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);

  const navigation = useNavigation();

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

  const fetchRecipes = () => {
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
          setRecipes(data);
        },
        error => console.error('Error fetching recipes:', error)
      );
    });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = () => {
    const results = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchText.toLowerCase()));
    setSearchResults(results);
  };
  const handleSaveRecipe = (recipeId: number) => {
    if (savedRecipes.includes(recipeId)) {
      setSavedRecipes(savedRecipes.filter(id => id !== recipeId));
    } else {
      setSavedRecipes([...savedRecipes, recipeId]);
    }
    console.log('Recipe saved:', recipeId);
  };

  const isRecipeSaved = (recipeId: number) => savedRecipes.includes(recipeId);
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
      <TouchableOpacity onPress={() => handleSaveRecipe(item.id)}>
        <Image
          source={isRecipeSaved(item.id) ? require('../../assets/filled-heart-icon.png') : require('../../assets/empty-heart-icon.png')}
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for recipes..."
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={searchText.length > 0 ? searchResults : recipes}
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
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
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
  heartIcon: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
    tintColor: 'red',
  },
});

export default SearchScreen;
