import firebase from '../firebase';
import { auth } from '../firebase';

export const login = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    console.log('Current User ID:', currentUser.uid);
  } catch (error) {
    console.error(error);
  }
};
