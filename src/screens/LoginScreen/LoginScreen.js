import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { login, getToken } from "../../firebase/auth/auth";

const LoginScreen = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  async function onSubmit(email, password) {
    await login(email, password);
  }
  // https://spoonacular.com/cdn/ingredients_100x100/

  // https://api.spoonacular.com/food/ingredients/search?query=steak&apiKey=fb5674256e7b41928221101869eae05c
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.titleContainer}>
        <Text style={styles.titleText}>FRESH</Text>
        <Text style={styles.captionText}>Your personal fridge manager</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.loginFormContainer}>
        <Text style={styles.formTitle}>Log In</Text>
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
        <Text
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        >
          Need an Account? Sign Up
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => onSubmit(emailInput, passwordInput)}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default LoginScreen;
