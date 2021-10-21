import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Switch } from 'react-native';
import styles from './styles';
import { useStorage } from '../../store/Context';
import { updateAllergies } from '../../store/reducers/userReducer';

const EditAllergies = ({ navigation }) => {
  const { userState, dispatch } = useStorage();
  const [milk, setMilk] = useState(userState.allergies.includes('milk'));
  const [eggs, setEggs] = useState(userState.allergies.includes('eggs'));
  const [nuts, setNuts] = useState(userState.allergies.includes('nuts'));
  const [peanuts, setPeanuts] = useState(
    userState.allergies.includes('peanuts')
  );
  const [shellfish, setShellfish] = useState(
    userState.allergies.includes('shellfish')
  );
  const [wheat, setWheat] = useState(userState.allergies.includes('wheat'));
  const [soybeans, setSoybeans] = useState(
    userState.allergies.includes('soybeans')
  );

  async function handleSubmit(allergies) {
    const listOfAllergies = [];

    for (const allergen in allergies) {
      if (allergies[allergen]) {
        listOfAllergies.push(allergen);
      }
    }
    await updateAllergies(listOfAllergies, dispatch);
    navigation.navigate('SettingsHome');
  }
  return (
    <SafeAreaView style={styles.alContainer}>
      <SafeAreaView style={styles.alCheckboxContainer}>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Milk</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={milk}
            onValueChange={setMilk}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Eggs</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={eggs}
            onValueChange={setEggs}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Tree Nuts</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={nuts}
            onValueChange={setNuts}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Peanuts</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={peanuts}
            onValueChange={setPeanuts}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Shellfish</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={shellfish}
            onValueChange={setShellfish}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Wheat</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={wheat}
            onValueChange={setWheat}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Soy</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={soybeans}
            onValueChange={setSoybeans}
          />
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.alButtonContainer}>
        <TouchableOpacity
          style={styles.alSubmitButton}
          onPress={() => {
            handleSubmit({
              milk,
              eggs,
              nuts,
              peanuts,
              shellfish,
              wheat,
              soybeans,
            });
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default EditAllergies;
