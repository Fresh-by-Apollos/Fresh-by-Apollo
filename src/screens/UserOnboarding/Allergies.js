import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Switch } from 'react-native';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { updateUserDiet } from '../../store/reducers/userReducer';
import { useStorage } from '../../store/Context';
import { deleteToken } from '../../firebase/auth/auth';

const Allergies = ({ navigation, route }) => {
  const { dispatch } = useStorage();
  const [milk, setMilk] = useState(false);
  const [eggs, setEggs] = useState(false);
  const [nuts, setNuts] = useState(false);
  const [peanuts, setPeanuts] = useState(false);
  const [shellfish, setShellfish] = useState(false);
  const [wheat, setWheat] = useState(false);
  const [soybeans, setSoybeans] = useState(false);

  const diet = route.params;

  async function handleSubmit(diet, allergies) {
    const dietRestrictions = [];
    const listOfAllergies = [];

    // Creating diet restrictions array
    for (const flag in diet) {
      if (diet[flag]) {
        dietRestrictions.push(flag);
      }
    }

    // Creating allergies array
    for (const allergen in allergies) {
      if (allergies[allergen]) {
        listOfAllergies.push(allergen);
      }
    }

    await updateUserDiet(dietRestrictions, listOfAllergies, dispatch);
    await deleteToken('firstTime');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Allergies</Text>
      <SafeAreaView style={styles.checkboxContainer}>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Milk</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={milk}
            onValueChange={setMilk}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Eggs</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={eggs}
            onValueChange={setEggs}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Tree Nuts</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={nuts}
            onValueChange={setNuts}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Peanuts</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={peanuts}
            onValueChange={setPeanuts}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Shellfish</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={shellfish}
            onValueChange={setShellfish}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Wheat</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={wheat}
            onValueChange={setWheat}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Soy</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={soybeans}
            onValueChange={setSoybeans}
          />
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate('DietRestrictions');
          }}
        >
          <Text style={styles.buttonText}>
            <MaterialIcons name="navigate-before" size={24} color="white" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            handleSubmit(diet, {
              milk,
              eggs,
              nuts,
              peanuts,
              shellfish,
              wheat,
              soybeans,
            })
          }
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Allergies;
