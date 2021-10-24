import styles from "./styles";
import React, { useState } from "react";
import { signUp } from "../../firebase/auth/auth";
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  async function onSubmit(firstName, lastName, email, password) {
    await signUp(firstName, lastName, email, password);
  }

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
            navigation.navigate("LoginScreen");
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
