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
import { updateUserPassword } from '../../store/reducers/userReducer';

const ChangePassword = ({ navigation }) => {
  const { dispatch } = useStorage();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [matchError, setMatchError] = useState(false);

  async function handleSubmit(newPassword, confirmNewPassword, password) {
    if (
      newPassword !== confirmNewPassword ||
      (newPassword === '' && confirmNewPassword === '')
    ) {
      setMatchError(true);
    } else {
      await updateUserPassword(newPassword, password, dispatch);
      navigation.navigate('SettingsHome');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.emContainer}>
        <SafeAreaView style={{ marginBottom: '2%' }}>
          <Text style={styles.emErrorMsg}>
            {matchError ? 'Error: Make sure both passwords match' : ''}
          </Text>
        </SafeAreaView>
        <KeyboardAvoidingView
          style={styles.emKeyContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <SafeAreaView style={styles.emInputContainer}>
            <Text style={styles.settingsTextHeader}>New Password</Text>
            <TextInput
              style={styles.emInputStyle}
              clearButtonMode="always"
              placeholder="Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={false}
              keyboardType="visible-password"
              autoCapitalize="none"
              autoCompleteType="password"
              textContentType="password"
            />
          </SafeAreaView>
          <SafeAreaView style={styles.emInputContainer}>
            <Text style={styles.settingsTextHeader}>Confirm New Password</Text>
            <TextInput
              style={styles.emInputStyle}
              clearButtonMode="always"
              placeholder="Password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry={false}
              keyboardType="visible-password"
              autoCapitalize="none"
              autoCompleteType="password"
              textContentType="password"
            />
          </SafeAreaView>
          <SafeAreaView style={styles.emInputContainer}>
            <Text style={styles.settingsTextHeader}>Current Password</Text>
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
              handleSubmit(newPassword, confirmNewPassword, passwordInput);
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;
