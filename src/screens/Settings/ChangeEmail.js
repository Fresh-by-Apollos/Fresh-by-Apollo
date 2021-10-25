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
import { updateUserEmail } from '../../store/reducers/userReducer';

const ChangeEmail = ({ navigation }) => {
  const { dispatch } = useStorage();
  const [emailInput, setEmailInput] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [matchError, setMatchError] = useState(false);

  async function handleSubmit(email, confirmEmail, password) {
    if (email !== confirmEmail || (email === '' && confirmEmail === '')) {
      setMatchError(true);
    } else {
      await updateUserEmail(email, password, dispatch);
      navigation.navigate('SettingsHome');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.emContainer}>
        <SafeAreaView style={{ marginBottom: '2%' }}>
          <Text style={styles.emErrorMsg}>
            {matchError ? 'Error: Make sure both emails match' : ''}
          </Text>
        </SafeAreaView>
        <KeyboardAvoidingView
          style={styles.emKeyContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <SafeAreaView style={styles.emInputContainer}>
            <Text style={styles.settingsTextHeader}>Email</Text>
            <TextInput
              style={styles.emInputStyle}
              autoFocus={false}
              clearButtonMode="always"
              placeholder="Email"
              value={emailInput}
              onChangeText={setEmailInput}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCompleteType="email"
              textContentType="emailAddress"
            />
          </SafeAreaView>
          <SafeAreaView style={styles.emInputContainer}>
            <Text style={styles.settingsTextHeader}>Confirm Email</Text>
            <TextInput
              style={styles.emInputStyle}
              autoFocus={false}
              clearButtonMode="always"
              placeholder="Email"
              value={confirmEmail}
              onChangeText={setConfirmEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCompleteType="email"
              textContentType="emailAddress"
            />
          </SafeAreaView>
          <SafeAreaView style={styles.emInputContainer}>
            <Text style={styles.settingsTextHeader}>Password</Text>
            <TextInput
              style={styles.emInputStyle}
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
          </SafeAreaView>
        </KeyboardAvoidingView>
        <SafeAreaView style={styles.emSubmitContainer}>
          <TouchableOpacity
            style={styles.emSubmitBtn}
            onPress={() => {
              handleSubmit(emailInput, confirmEmail, passwordInput);
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangeEmail;
