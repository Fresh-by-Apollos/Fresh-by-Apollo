import firebase from '../firebase';
import { auth } from '../firebase';
import * as SecureStore from 'expo-secure-store';

// Handle Token on Secure Store
export const saveToken = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getToken = async (key) => {
  return await SecureStore.getItemAsync(key);
};

export const deleteToken = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

// Sign Up (firstTime = true)
export const signUp = async (firstName, lastName, email, password) => {
  try {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        saveToken('firstTime', 'true');
        const uid = response.user.uid;
        const data = {
          dietRestrictions: [],
          allergies: [],
          email,
          firstName,
          lastName,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .catch((error) => {
            alert(error);
          });
      });
    console.log('Signed Up Successfully');
  } catch (error) {
    alert(error);
  }
};

// Login (firstTime = false)
export const login = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    await saveToken('firstTime', 'false');
    console.log('Signed In Successfully');
  } catch (error) {
    alert(error);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
    await deleteToken('firstTime');
    console.log('Signed Out Successfully');
  } catch (error) {
    alert(error);
  }
};
