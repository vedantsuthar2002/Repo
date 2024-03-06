import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Text, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { FONTFAMILY } from '../../theme/theme';
import SocialSignInButton from '../../components/SocialSignInButton';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import TabNavigatorScreen from '../navigation/TabNavigatorScreen';


const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

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

  const onSignInPressed = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Users WHERE Name = ? AND Password = ?',
        [username, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            // User found, navigate to the Tab screen
            navigation.navigate('Tab');
          } else {
            // User not found or credentials incorrect
            Alert.alert('Error', 'Invalid username or password');
          }
        },
        error => {
          console.error('Error executing login query: ', error);
        }
      );
    });
  };

  const onForgotPasswordPressed = () => {
    console.warn('ForgotPassword');
    navigation.navigate('ForgotPassword');
  };

  const onSignUppress = () => {
    console.warn('Signup');
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <View style={styles.logoCantainer}>
          <Image source={require('../../assets/images/Logo.png')} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
        </View>
        <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />

        <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry />

        <CustomButton text='Sign In' onPress={onSignInPressed} type='PRIMARY' bgColor='' fgColor='' />

        <CustomButton text='Forgot password?' onPress={onForgotPasswordPressed} type='TERTIARY' bgColor='' fgColor='' />

        <SocialSignInButton />

        <CustomButton text="Don't have an account? Create one" onPress={onSignUppress} type='TERTIARY' bgColor='' fgColor='' />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '30%',
    maxWidth: 150,
    maxHeight: 150,
    borderRadius: 150,
  },
  logoCantainer: {
    width: '90%',
    height: 100,
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
