import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState('');

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

  const onSendPressed = () => {
    if (!username) {
      Alert.alert('Error', 'Please enter your username');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Users WHERE Name = ?',
        [username],
        (tx, results) => {
          if (results.rows.length > 0) {
            // Username found, navigate to NewPasswordScreen
            navigation.navigate('NewPassword', { username: username });


          } else {
            // Username not found
            Alert.alert('Error', 'Username not found');
          }
        },
        error => {
          console.error('Error executing query: ', error);
        }
      );
    });
  };

  const onSignInpress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>
        <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
        <CustomButton text='Send' onPress={onSendPressed} type='PRIMARY' bgColor={''} fgColor={''} />
        <CustomButton text="Back to Sign in" onPress={onSignInpress} type='TERTIARY' bgColor={''} fgColor={''} />
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
});

export default ForgotPasswordScreen;
