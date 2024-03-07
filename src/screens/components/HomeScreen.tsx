import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native'; // Import useIsFocused hook
import SQLite from 'react-native-sqlite-storage';
import RecipeDetailsScreen from './RecipeDetailsScreen';

interface Recipe {
  id: number;
  title: string;
  description: string;
  portion: number;
  cooking_time: number;
}

const HomeScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
  const isFocused = useIsFocused(); // Initialize isFocused hook
  const navigation = useNavigation(); // Initialize navigation hook

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

  const fetchUsername = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Name FROM Users LIMIT 1',
        [],
        (_, { rows }) => {
          const username: string[] = [];
          for (let i = 0; i < rows.length; i++) {
            const { Name } = rows.item(i);
            username.push(Name);
          }
          setUserName(username);
        },
        error => console.error('Error fetching usernames:', error)
      );
    });
  };


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
    fetchUsername();
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  useEffect(() => {
    if (isFocused) { // Fetch recipes data only when HomeScreen is focused
      fetchRecipes();
    }
  }, [isFocused]);

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
      <View >
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeDescription}>{item.description}</Text>
        <Text style={styles.recipeDetails}>Portion: {item.portion}</Text>
        <Text style={styles.recipeDetails}>Cooking Time: {item.cooking_time} minutes</Text>
      </View>
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <Image source={require('../../assets/images/user.png')} style={styles.userPhoto} />
        <View style={styles.greetingContainer}>
          <Text style={styles.welcomeText}>Welcome, {userName}</Text>
          <Text style={styles.greetingText}>{greeting}</Text>
        </View>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Type ingredients..."
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={recipes}
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
    backgroundColor: '#FFF'
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  greetingContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  greetingText: {
    fontSize: 14,
    color: '#666666',
  },
  recipeItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDescription: {
    fontSize: 16,
    marginBottom: 5,
    maxWidth: '90%'
  },
  recipeDetails: {
    fontSize: 14,
    color: '#666666',
  },
  heartIcon: {
    width: 24,
    height: 24,
    tintColor: 'red',
    justifyContent: 'flex-end',
    right: 2,
  },
});

export default HomeScreen;
