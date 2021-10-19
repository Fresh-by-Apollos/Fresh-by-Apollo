import React, { useEffect } from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { signOut } from '../../firebase/auth/auth';
import { useStorage } from '../../store/Context';

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

export default Settings = ({ navigation }) => {
  const { userState, dispatch } = useStorage();
  const { firstName, lastName, email, allergies, dietRestrictions } = userState;

  async function onSignOut() {
    await signOut();
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.headerText}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.headerEmail}>{email}</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.bodyContainer}>
        <SafeAreaView style={styles.settingSectionContainer}>
          <Text style={styles.settingsTextHeader}>Account</Text>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => {
              navigation.navigate('EditUserDetails');
            }}
          >
            <SafeAreaView style={styles.settingsDetail}>
              <FontAwesome name="user-circle-o" size={24} color="black" />
              <Text style={styles.settingsText}>Profile</Text>
            </SafeAreaView>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => {
              navigation.navigate('ChangeEmail');
            }}
          >
            <SafeAreaView style={styles.settingsDetail}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>Email</Text>
            </SafeAreaView>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}
          >
            <SafeAreaView style={styles.settingsDetail}>
              <MaterialCommunityIcons
                name="onepassword"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>Password</Text>
            </SafeAreaView>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.settingSectionContainer}>
          <Text style={styles.settingsTextHeader}>Restrictions</Text>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => {
              navigation.navigate('EditAllergies');
            }}
          >
            <SafeAreaView style={styles.settingsDetail}>
              <MaterialCommunityIcons name="allergy" size={30} color="black" />
              <Text style={styles.settingsText}>Edit Allergies</Text>
            </SafeAreaView>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => {
              navigation.navigate('EditDietRestrictions');
            }}
          >
            <SafeAreaView style={styles.settingsDetail}>
              <MaterialCommunityIcons name="food-off" size={30} color="black" />
              <Text style={styles.settingsText}>Edit Diet Restrictions</Text>
            </SafeAreaView>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
      <TouchableOpacity style={styles.signOutBtn} onPress={() => onSignOut()}>
        <Text style={styles.btnText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
