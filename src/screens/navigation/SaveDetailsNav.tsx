import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeDetailsScreen from '../components/RecipeDetailsScreen';
import SaveScreen from '../components/SaveScreen';
const Stack = createStackNavigator();

const SearchNav: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="save" component={SaveScreen} />
            <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        </Stack.Navigator>
    );
};

export default SearchNav;