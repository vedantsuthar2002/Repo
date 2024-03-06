import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButton from '../../components/SocialSignInButton';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const navigation = useNavigation();

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  }

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  }

  // Initialize SQLite database
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

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT, Password TEXT, RPassword TEXT);",
        [],
        () => {
          console.log('Table created successfully.');
        },
        error => {
          console.error('Error creating table:', error);
        }
      );
    });
  };

  // Call createTable when component mounts
  useEffect(() => {
    createTable();
  }, []);

  const onRegisterPressed = () => {
    if (!username || !email || !password || !passwordRepeat) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== passwordRepeat) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Insert user data into database
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Users (Name, Email, Password, RPassword) VALUES (?, ?, ?, ?)',
        [username, email, password, passwordRepeat],
        () => {
          console.log('User registered successfully.');
          // Navigate to next screen
          navigation.navigate('SignIn');
        },
        error => {
          console.error('Error registering user: ', error);
        }
      );
    });
  };


  const onSignInpress = () => {
    console.warn('signin');
    navigation.navigate('SignIn');
  }
  // Rest of your component code...

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false} />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false} />
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
        <CustomInput placeholder="Repeat Password" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry />
        <CustomButton text="Register" onPress={onRegisterPressed} type="PRIMARY" bgColor={''} fgColor={''} />
        <Text style={styles.text}>By registering, you confirm that you accept our{' '}<Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and {' '}<Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text></Text>

        <SocialSignInButton />

        <CustomButton text="Have an account? Sign in" onPress={onSignInpress} type='TERTIARY' bgColor='' fgColor='' />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FB9400',
  },
});

export default SignUpScreen;
