import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';

const NewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newRepeatPassword, setNewRepeatPassword] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params as { username: string }; // Cast route.params to { username: string }

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

  const onSubmitPressed = () => {
    if (!newPassword || !newRepeatPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== newRepeatPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Users SET Password = ? WHERE Name = ?',
        [newPassword, username],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Password updated successfully');
            navigation.navigate('SignIn');
          } else {
            Alert.alert('Error', 'Failed to update password');
          }
        },
        error => {
          console.error('Error updating password: ', error);
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
        <CustomInput placeholder='Enter your new password' value={newPassword} setValue={setNewPassword} secureTextEntry={true} />
        <CustomInput placeholder='Confirm your new password' value={newRepeatPassword} setValue={setNewRepeatPassword} secureTextEntry={true} />
        <CustomButton text='Submit' onPress={onSubmitPressed} type='PRIMARY' bgColor={''} fgColor={''} />
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

export default NewPasswordScreen;
