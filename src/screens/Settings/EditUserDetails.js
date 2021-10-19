import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
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
    <SafeAreaView style={styles.userContainer}>
      <SafeAreaView style={styles.userBodyContainer}>
        <SafeAreaView style={styles.inputContainer}>
          <Text>First Name</Text>
          <TextInput
            style={styles.inputStyle}
            autoFocus={true}
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
          <Text>Last Name</Text>
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
        onPress={() => {
          handleSubmit(firstNameInput, lastNameInput);
        }}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditUserDetails;
