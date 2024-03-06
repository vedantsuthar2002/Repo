import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigatorScreen from './TabNavigatorScreen';
import SignNavigation from './SignNavigation';
import SplashScreen from '../loginScreens/SplashScreen';
import RecipeDetailsScreen from '../components/RecipeDetailsScreen';

const Stack = createStackNavigator();

const SignTab: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Splash' component={SplashScreen} />
            <Stack.Screen name="Sign" component={SignNavigation} />
            <Stack.Screen name="Tab" component={TabNavigatorScreen} />
        </Stack.Navigator>
    );
};

export default SignTab;
