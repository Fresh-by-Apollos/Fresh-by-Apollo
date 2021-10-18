import React, { useEffect } from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { signOut } from '../../firebase/auth/auth';
import { useStorage } from '../../store/Context';
import styles from './styles';

export default Settings = () => {
  const { userState, dispatch } = useStorage();
  const { firstName, lastName, email, allergies, dietRestrictions } = userState;

  async function onSignOut() {
    await signOut();
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <SafeAreaView>
          <Text>{`${firstName} ${lastName}`}</Text>
          <Text>{email}</Text>
        </SafeAreaView>
        <SafeAreaView>
          <Text>Allergens</Text>
          <Text>
            {allergies.map((allergy) => {
              return allergy;
            })}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <TouchableOpacity style={styles.signOutBtn} onPress={() => onSignOut()}>
        <Text style={styles.btnText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
