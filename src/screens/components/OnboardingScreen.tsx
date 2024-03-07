import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';

const OnboardingScreen = () => {

    const navigation = useNavigation();
    const handleSkip = () => {
        // Navigate to the home screen when the "Skip" button is pressed
        navigation.navigate('Tab');
    };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
            <View style={styles.center} >
                <Image
                    source={require('../../assets/images/onboarding.png')}
                    style={styles.image}
                />

                <Text style={styles.title}>Thousands of tested recipes</Text>
                <Text style={styles.subtitle}>There is no need to fear failure. Tested recipes are guaranteed to work by our professional chefs.</Text>

            </View>
            <View style={styles.button}>
                <CustomButton text='Sign In' onPress={() => navigation.navigate('Sign')} type='PRIMARY' bgColor='' fgColor='' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',

    },
    skipButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#F3F4F6',
        width: 65,
        height: 38,
        paddingTop: 8,
        paddingRight: 18,
        paddingBottom: 8,
        paddingLeft: 18,
        gap: 10,
        borderRadius: 8,
    },
    skipButtonText: {
        color: '#9CA3AF',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 22,
        width: 29,
        height: 22,
    },
    center: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },
    image: {
        width: 260,
        height: 163.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
        lineHeight: 20,
    },
    button: {

        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '90%',
    }
});

export default OnboardingScreen;
