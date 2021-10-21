import firebase from "../../firebase/firebase";

// initial State
export const userState = {};

// Action Types
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";

// Action Creators
export const _setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

// Firebase Thunks
export const setUserDietAllergies = async (diet, allergies, dispatch) => {
  try {
    const uid = firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection("users");
    const user = firebase.firestore().collection("users").doc(uid);

    user.update({
      allergies: allergies,
      dietRestrictions: diet,
      onBoarded: true,
    });

    const updatedUser = (await usersRef.doc(uid).get()).data();
    dispatch(_updateUser(updatedUser));
    alert("User updated!");
    console.log(updatedUser);
  } catch (error) {
    console.error(error);
  }
};

export const updateUserDetails = async (firstName, lastName, dispatch) => {
  try {
    const uid = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection("users");
    const user = userRef.doc(uid);

    user.update({
      firstName: firstName,
      lastName: lastName,
    });

    const updatedUser = (await userRef.doc(uid).get()).data();
    dispatch(_updateUser(updatedUser));
    alert("User updated!");
  } catch (error) {
    console.error(error);
  }
};

export const updateUserEmail = async (email, password, dispatch) => {
  try {
    const currentUser = firebase.auth().currentUser;
    const userRef = firebase.firestore().collection("users");
    const user = userRef.doc(currentUser.uid);
    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    await currentUser.reauthenticateWithCredential(credential);

    await currentUser.updateEmail(email);

    user.update({
      email: email,
    });

    const updatedUser = (await userRef.doc(currentUser.uid).get()).data();
    dispatch(_updateUser(updatedUser));
    alert("Email updated!");
  } catch (error) {
    console.error(error);
  }
};

export const updateUserPassword = async (newPassword, password, dispatch) => {
  try {
    const currentUser = firebase.auth().currentUser;
    const userRef = firebase.firestore().collection("users");
    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    await currentUser.reauthenticateWithCredential(credential);

    await currentUser.updatePassword(newPassword);
    const updatedUser = (await userRef.doc(currentUser.uid).get()).data();
    dispatch(_updateUser(updatedUser));
    alert("Password updated!");
  } catch (error) {
    console.error(error);
  }
};

export const updateAllergies = async (allergies, dispatch) => {
  try {
    const uid = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection("users");
    const user = userRef.doc(uid);

    user.update({
      allergies: allergies,
    });

    const updatedUser = (await userRef.doc(uid).get()).data();
    dispatch(_updateUser(updatedUser));
    alert("Allergies updated!");
  } catch (error) {
    console.error(error);
  }
};

export const updateDietRestrictions = async (diet, dispatch) => {
  try {
    const uid = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection("users");
    const user = userRef.doc(uid);

    user.update({
      dietRestrictions: diet,
    });

    const updatedUser = (await userRef.doc(uid).get()).data();
    dispatch(_updateUser(updatedUser));
    alert("Diet updated!");
  } catch (error) {
    console.error(error);
  }
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, userState: action.user };
    }
    case UPDATE_USER: {
      return { ...state, userState: { ...action.user } };
    }
    default:
      return state;
  }
};

export default userReducer;
