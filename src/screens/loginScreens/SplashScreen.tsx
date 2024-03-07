import React, { useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("Onboarding");
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FB9400" barStyle="light-content" />
            <View style={styles.content}>
                <View style={styles.ellips}>
                    <Image
                        source={require('../../assets/images/Logo.png')}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FB9400',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ellips: {
        width: 115,
        height: 115,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 85,
        height: 85,
    },
});

export default SplashScreen;
