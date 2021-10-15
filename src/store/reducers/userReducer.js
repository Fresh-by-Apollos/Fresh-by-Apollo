import firebase from '../../firebase/firebase';

// initial State
export const userState = {};

// Action Types
const SET_USER = 'SET_USER';
const UPDATE_USER_DIET = 'UPDATE_USER_DIET';

// Action Creators
export const _setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const _updateUserDiet = (user) => {
  return {
    type: UPDATE_USER_DIET,
    user,
  };
};

// Firebase Thunks
export const updateUserDiet = async (diet, allergies, dispatch) => {
  try {
    const uid = firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection('users');
    const user = firebase.firestore().collection('users').doc(uid);

    user.update({
      allergies: allergies,
      dietRestrictions: diet,
    });

    const updatedUser = (await usersRef.doc(uid).get()).data();
    dispatch(_updateUserDiet(updatedUser));
    alert('User updated!');
    console.log(updatedUser);
  } catch (error) {
    console.error(error);
  }
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, userState: action.user };
    }
    case UPDATE_USER_DIET: {
      return { ...state, userState: { ...action.user } };
    }
    default:
      return state;
  }
};

export default userReducer;
