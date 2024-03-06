import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../components/ProfileScreen';
import MyRecipesScreen from '../components/MyRecipesScreen';
import EditProfileScreen from '../components/EditProfileScreen';
const Stack = createStackNavigator();

const ProNavScreen: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="MyRecipes" component={MyRecipesScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    );
};

export default ProNavScreen;