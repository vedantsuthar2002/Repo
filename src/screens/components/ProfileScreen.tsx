// ProfileScreen.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation();

    const handleEditProfile = () => {
        // Navigate to the edit profile screen
        navigation.navigate('EditProfile');
    };

    const handleMyRecipes = () => {
        // Navigate to the screen displaying user's uploaded recipes
        navigation.navigate('MyRecipes');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.profileInfo}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>JohnDoe123</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>johndoe@example.com</Text>
                <Text style={styles.label}>Bio:</Text>
                <Text style={styles.value}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.myRecipesButton} onPress={handleMyRecipes}>
                <Text style={styles.myRecipesButtonText}>My Recipes</Text>
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
        marginBottom: 20,
    },
    profileInfo: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 15,
    },
    editButton: {
        backgroundColor: '#FB9400',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    myRecipesButton: {
        backgroundColor: '#3F51B5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    myRecipesButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
