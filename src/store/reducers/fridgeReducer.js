import firebase from "../../firebase/firebase";

// fridgeState
export const fridgeState = [];

// Action constants
const SET_FRIDGE = "SET_FRIDGE";

// Action Creators
const _setFridge = (items) => {
  return {
    type: SET_FRIDGE,
    items,
  };
};

// Fake Thunk
export const fetchFridgeItems = async (dispatch) => {
  const userId = "2SbLcxDpmJHXKpJ7bEqV";
  const fridgeRef = firebase
    .firestore()
    .collection(`/users/${userId}/currentFridge`);

  const snapshot = await fridgeRef.get();

  let resultArr = [];

  snapshot.forEach((doc) => {
    resultArr.push({
      FridgeItem: doc.data().name,
      allergens: doc.data().allergens,
    });
  });
  dispatch(_setFridge(resultArr));
};

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
