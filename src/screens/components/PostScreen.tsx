import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import CustomInput from '../../components/CustomInput';
import IngredientsList from '../../components/IngredientsList';
import ImagePickerModel from '../../components/ImagePickerModel';
import SQLite from 'react-native-sqlite-storage';

interface Ingredient {
  name: string;
}

const PostScreen: React.FC = () => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [portion, setPortion] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '' }]);

  const resetRecipe = () => {
    setDishName('');
    setDescription('');
    setPortion('');
    setTime('');
    setIngredients([{ name: '' }]);
  };


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
        'CREATE TABLE IF NOT EXISTS Recipes (ID INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, description TEXT, photos TEXT, portion INTEGER, cooking_time INTEGER, FOREIGN KEY(user_id) REFERENCES Users(ID))',
        [],
        () => console.log('Recipes table created successfully'),
        error => console.error('Error while creating Recipes table:', error)
      );

    });
  };
  useEffect(() => {
    createTable();
  }, []);

  const saveRecipe = () => {
    if (!dishName || !description || !portion || !time) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Recipes (title, description ,portion ,cooking_time) VALUES (?,?,?,?)', [dishName, description, portion, time],
        () => {
          console.log('resipe added');

        },
        error => {
          console.log('resipe failed', error);
        }
      );
    })
  };

  const onAddIng = () => {
    const data = [...ingredients];
    data.push({ name: '' });
    console.log('data', data);
    setIngredients(data);

  }

  const onDeleteIngredients = (index: number) => {
    console.log("del===", index);
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  }
  const onHandle = (text: string, index: number) => {
    const updatedIngredients = [...ingredients];
    console.log(" ----", updatedIngredients, index, text);
    updatedIngredients[index].name = text;
    setIngredients(updatedIngredients);
  };
  const onEndEditing = (text: string, index: number) => {
    // const updatedIngredients = [...ingredients];
    // console.log(" ----", updatedIngredients, index, text);
    // updatedIngredients[index].name = text;
    // setIngredients(updatedIngredients);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.PostContainer}>
        <Text style={styles.HText}>
          Post recipe
        </Text>
        <Text style={styles.heading}>
          Recipe title
        </Text>
        <CustomInput placeholder='Family favorite dishes...' value={dishName} setValue={setDishName} />
        <Text style={styles.heading}>
          Description
        </Text>
        <CustomInput placeholder="Example: grandma's delicious recipe..." value={description} setValue={setDescription} multiline={true}
          numberOfLines={4} />
        <Text style={styles.heading}>
          Recipe photo
        </Text>
        {/* ImagePickerModel */}
        <ImagePickerModel />
        <View style={styles.TiPo}>
          <Text style={styles.heading}>
            Portion
          </Text>
          <TextInput style={styles.TiPoInput} placeholder='2 people' value={portion} onChangeText={setPortion}></TextInput>
        </View>
        <View style={styles.TiPo}>
          <Text style={styles.heading}>
            Cooking time
          </Text>
          <TextInput style={styles.TiPoInput} placeholder='1 hr 30 min' value={time} onChangeText={setTime}></TextInput>
        </View>
        <Text style={styles.heading}>Ingredients</Text>
        <IngredientsList ingredients={ingredients} onPressAdd={() => onAddIng()} onPressDelete={(index) => onDeleteIngredients(index)} onHandle={(text, index) => onHandle(text, index)} onEndEditing={(text, index) => onEndEditing(text, index)} />

        {/* Reset and Save buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={resetRecipe}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={saveRecipe}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  PostContainer: {
    flex: 1,
    padding: 18,
  },
  HText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 10,
    paddingLeft: 5,
  },
  heading: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 8,
  },
  TiPo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TiPoInput: {
    backgroundColor: '#FFF',
    width: '50%',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FB9400',
    padding: 10,
    borderRadius: 5,
    width: '48%', // Adjust width as needed
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PostScreen;
