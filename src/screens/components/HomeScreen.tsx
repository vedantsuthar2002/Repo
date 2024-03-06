import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
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
  const [userName, setUserName] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);

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
    setUserName('John Doe');
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

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
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.userPhoto} />
        <View style={styles.greetingContainer}>
          <Text style={styles.welcomeText}>Welcome, {userName}</Text>
          <Text style={styles.greetingText}>{greeting}</Text>
        </View>
      </View>

      <FlatList
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
    marginBottom: 5,
  },
  greetingText: {
    fontSize: 14,
    color: '#666666',
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

export default HomeScreen;
