import React, { useState } from 'react';
import { SafeAreaView, Text, Switch, TouchableOpacity } from 'react-native';
import { useStorage } from '../../store/Context';
import styles from './styles';
import { updateDietRestrictions } from '../../store/reducers/userReducer';

const EditDietRestrictions = ({ navigation }) => {
  const { userState, dispatch } = useStorage();
  const [vegan, setVegan] = useState(
    userState.dietRestrictions.includes('vegan')
  );
  const [vegetarian, setVegetarian] = useState(
    userState.dietRestrictions.includes('vegetarian')
  );
  const [gluten_free, setGlutenFree] = useState(
    userState.dietRestrictions.includes('gluten_free')
  );
  const [kosher, setKosher] = useState(
    userState.dietRestrictions.includes('kosher')
  );
  const [keto, setKeto] = useState(userState.dietRestrictions.includes('keto'));
  const [dairy_free, setDairyFree] = useState(
    userState.dietRestrictions.includes('dairy_free')
  );
  const [lactose_intolerant, setLactoseIntolerant] = useState(
    userState.dietRestrictions.includes('lactose_intolerant')
  );

  async function handleSubmit(diet) {
    const dietRestrictions = [];

    for (const flag in diet) {
      if (diet[flag]) {
        dietRestrictions.push(flag);
      }
    }
    await updateDietRestrictions(dietRestrictions, dispatch);
    navigation.navigate('SettingsHome');
  }

  return (
    <SafeAreaView style={styles.alContainer}>
      <SafeAreaView style={styles.alCheckboxContainer}>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Vegan</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={vegan}
            onValueChange={setVegan}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Vegetarian</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={vegetarian}
            onValueChange={setVegetarian}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Gluten-Free</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={gluten_free}
            onValueChange={setGlutenFree}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Kosher</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={kosher}
            onValueChange={setKosher}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Keto</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={keto}
            onValueChange={setKeto}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Dairy-Free</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={dairy_free}
            onValueChange={setDairyFree}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.alCheckboxItem}>
          <Text style={styles.alCheckboxDetail}>Lactose Intolerant</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={lactose_intolerant}
            onValueChange={setLactoseIntolerant}
          />
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.alButtonContainer}>
        <TouchableOpacity
          style={styles.alSubmitButton}
          onPress={() => {
            handleSubmit({
              vegan,
              vegetarian,
              gluten_free,
              kosher,
              keto,
              dairy_free,
              lactose_intolerant,
            });
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default EditDietRestrictions;
