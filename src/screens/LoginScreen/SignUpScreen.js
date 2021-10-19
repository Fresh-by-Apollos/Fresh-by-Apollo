import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";
import { signUp, getToken } from "../../firebase/auth/auth";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import firebase from "../../firebase/firebase";


const SignUpScreen = ({ navigation }) => {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  async function onSubmit(firstName, lastName, email, password) {
    await signUp(firstName, lastName, email, password);
    await registerForPushNotificationsAsync();

  //request permission to send Push Notifications
  const registerForPushNotificationsAsync = async () => {
    console.log('entered registerForPushNotificationsAynsc')
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      console.log('existingStatus:', existingStatus)
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('token:', token);
      console.log('firebase.auth().currentUser.uid', firebase.auth().currentUser.uid)
      const userId = firebase.auth().currentUser.uid
      const userRef = firebase.firestore().collection('users')
      await userRef.doc(userId).set({expoPushToken: token}).catch((error) => {
        alert(error)
      })
      const updatedUserRef = firebase.firestore().collection('users')
      // console.log('updatedUserRef.doc(userId).onSnapshot(function(doc) { console.log(expoPushToken" , doc.data().expoPushToken', updatedUserRef.doc(userId).onSnapshot(function(doc) { console.log("expoPushToken:" , doc.data().expoPushToken)}))
      console.log('Set Expo Notification Token successfully')


      // await SecureStore.setItemAsync('expoPushToken', token)
      // let token2 = await SecureStore.getItemAsync('expoPushToken')
      // console.log('token 2:', token2)
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.titleContainer}>
        <Text style={styles.titleText}>FRESH</Text>
        <Text style={styles.captionText}>Your personal fridge manager</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.signupFormContainer}>
        <Text style={styles.formTitle}>Sign Up</Text>
        <TextInput
          style={styles.inputStyle}
          autoFocus={true}
          clearButtonMode="always"
          placeholder="First Name"
          value={firstNameInput}
          onChangeText={setFirstNameInput}
          autoCapitalize="words"
          autoCompleteType="name"
          textContentType="name"
        />
        <TextInput
          style={styles.inputStyle}
          clearButtonMode="always"
          placeholder="Last Name"
          value={lastNameInput}
          onChangeText={setLastNameInput}
          autoCapitalize="words"
          autoCompleteType="name"
          textContentType="name"
        />
        <TextInput
          style={styles.inputStyle}
          clearButtonMode="always"
          placeholder="Email"
          value={emailInput}
          onChangeText={setEmailInput}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.inputStyle}
          clearButtonMode="always"
          placeholder="Password"
          value={passwordInput}
          onChangeText={setPasswordInput}
          secureTextEntry={false}
          keyboardType="visible-password"
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
        />
        <Text
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
        >
          Already have an account? Log In
        </Text>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => {
            onSubmit(firstNameInput, lastNameInput, emailInput, passwordInput);
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
