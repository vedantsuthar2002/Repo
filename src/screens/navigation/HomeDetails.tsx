import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import RecipeDetailsScreen from '../components/RecipeDetailsScreen';
const Stack = createStackNavigator();

const HomeDetailsScreen: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        </Stack.Navigator>
    );
};

export default HomeDetailsScreen;