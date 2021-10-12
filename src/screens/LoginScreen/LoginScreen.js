import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import { login } from '../../firebase/auth/auth';

const LoginScreen = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  async function onSubmit(emailInput, passwordInput) {
    try {
      login(emailInput, passwordInput);
      console.log(currentUser);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.titleContainer}>
        <Text style={styles.titleText}>FRESH</Text>
        <Text style={styles.captionText}>Your personal fridge manager</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.formContainer}>
        <TextInput
          style={styles.inputStyle}
          autoFocus={true}
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
          secureTextEntry={true}
          keyboardType="visible-password"
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
        />
        <Text onPress={() => Alert.alert('imagine you go to sign up page')}>
          Need an Account? Sign Up
        </Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => onSubmit(emailInput, passwordInput)}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default LoginScreen;
