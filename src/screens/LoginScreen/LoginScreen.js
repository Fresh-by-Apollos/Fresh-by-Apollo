import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './login-styles';

const LoginScreen = () => {
  const [isSignIn, setSignIn] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const toggleSwitch = () => setSignIn(!isSignIn);

  return (
    <SafeAreaView style={styles.loginContainer}>
      <Text style={styles.titleText}>FRESH</Text>
      <Switch onValueChange={toggleSwitch} value={isSignIn} />
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
      <Text>Forgot Password</Text>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
