import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { useStorage } from '../../store/Context';
import styles from './styles';
import { updateUserDetails } from '../../store/reducers/userReducer';

const EditUserDetails = ({ navigation }) => {
  const { userState, dispatch } = useStorage();
  const [firstNameInput, setFirstNameInput] = useState(userState.firstName);
  const [lastNameInput, setLastNameInput] = useState(userState.lastName);

  async function handleSubmit(firstName, lastName) {
    await updateUserDetails(firstName, lastName, dispatch);
    navigation.navigate('SettingsHome');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.userContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={50}
      >
        <SafeAreaView style={styles.userBodyContainer}>
          <SafeAreaView style={styles.inputContainer}>
            <Text style={styles.settingsTextHeader}>First Name</Text>
            <TextInput
              style={styles.inputStyle}
              autoFocus={false}
              clearButtonMode="while-editing"
              placeholder="First Name"
              value={firstNameInput}
              onChangeText={setFirstNameInput}
              autoCorrect={false}
              autoCapitalize="words"
              autoCompleteType="name"
              textContentType="name"
            />
          </SafeAreaView>
          <SafeAreaView style={styles.inputContainer}>
            <Text style={styles.settingsTextHeader}>Last Name</Text>
            <TextInput
              style={styles.inputStyle}
              clearButtonMode="while-editing"
              placeholder="Last Name"
              value={lastNameInput}
              onChangeText={setLastNameInput}
              autoCorrect={false}
              autoCapitalize="words"
              autoCompleteType="name"
              textContentType="name"
            />
          </SafeAreaView>
        </SafeAreaView>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            handleSubmit(firstNameInput, lastNameInput);
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default EditUserDetails;
