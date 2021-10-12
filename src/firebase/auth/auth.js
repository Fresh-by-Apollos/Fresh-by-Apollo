import firebase from '../firebase';
import { auth } from '../firebase';
import * as SecureStore from 'expo-secure-store';

export const saveToken = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getToken = async (key) => {
  return await SecureStore.getItemAsync('token');
};

export const login = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log('Signed In Successfully');
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
    console.log('Signed Out Successfully');
  } catch (error) {
    console.error(error);
  }
};
