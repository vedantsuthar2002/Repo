// SignNavigation.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../loginScreens/SignInScreen';
import SignUpScreen from '../loginScreens/SignUpScreen';
import ForgotPasswordScreen from '../loginScreens/ForgotPasswordScreen';
import NewPasswordScreen from '../loginScreens/NewPasswordScreen';
import ConfirmEmailScreen from '../loginScreens/ConfirmEmailScreen';
import TabNavigatorScreen from './TabNavigatorScreen';
import TabScreen from '../components/TabScreen';

const Stack = createStackNavigator();

const SignNavigation: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SignIn'>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />

        </Stack.Navigator>
    );
};

export default SignNavigation;
