import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Switch } from 'react-native';
import styles from './styles';

const DietRestrictions = () => {
  const [isVegan, setVegan] = useState(false);
  const [isGlutenFree, setGlutenFree] = useState(false);
  // vegetarian, kosher, keto, dairy free, lactose intolerant, dairy free
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Diet Restrictions</Text>
      <SafeAreaView style={styles.checkboxContainer}>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Vegan</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={isVegan}
            onValueChange={setVegan}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Gluten-Free</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4C956C' }}
            ios_backgroundColor="#3e3e3e"
            value={isGlutenFree}
            onValueChange={setGlutenFree}
          />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default DietRestrictions;
