// Action Creators
import { auth } from "../../firebase/firebase";
// import { auth } from "../../../firebase";

const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
  // This will return a promise so we could properly shoot an err if it doesn't work
};

const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const logout = () => {
  return auth.signOut();
};

const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

export { signup, login, logout, resetPassword };
