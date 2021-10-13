import firebase from '../../firebase/firebase';

// fridgeState
export const fridgeState = [];

// Action Types
const SET_FRIDGE = 'SET_FRIDGE';

// Action Creators
const _setFridge = (items) => {
  return {
    type: SET_FRIDGE,
    items,
  };
};

// Thunks
export const fetchFridgeItems = async (dispatch, uid) => {
  try {
    const fridgeRef = firebase
      .firestore()
      .collection(`/users/${uid}/currentFridge`)
      .orderBy('expirationDate', 'asc');
    const snapshot = await fridgeRef.get();
    const resultArray = [];
    snapshot.forEach((doc) => {
      resultArray.push({
        imageUrl: doc.data().image,
        name: doc.data().name,
        servings: doc.data().servings,
        expirationDate: doc.data().expirationDate,
        allergens: doc.data().allergens,
        dietFlags: doc.data().dietFlags,
        protein: doc.data().protein,
        carbs: doc.data().protein,
        fat: doc.data().fat,
        upcCode: doc.data().upcCode
      })
    })
    dispatch(_setFridge(resultArray))
  } catch (error) {
    return `Error: ${error.message} || fetchFridgeItems`;
  }
};

// Reducers
const fridgeReducer = (state = fridgeState, action) => {
  switch (action.type) {
    case SET_FRIDGE: {
      return { ...state, fridgeState: action.items };
    }
    default:
      return state;
  }
};

export default fridgeReducer;
