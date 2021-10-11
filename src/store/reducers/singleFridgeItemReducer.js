import firebase from "../../firebase/firebase";
import { collection, query, where } from "firebase/firestore";

// singleFridgeItemState
export const singleFridgeItemState = {};

// Action constants
const SET_SINGLE_FRIDGE_ITEM = "SET_SINGLE_FRIDGE_ITEM";

// Action creators
const _setSingleFridgeItem = (item) => {
  return {
    type: SET_SINGLE_FRIDGE_ITEM,
    item,
  };
};

// Fake Thunk
export const fetchSingleFridgeItem = async (dispatch) => {
  //firebase main
  // const userId = "2SbLcxDpmJHXKpJ7bEqV";

  //firebase backup
  const userId = "S0VN3xoK05MwlPlPzPWr";
  const productId = "Kpn9JFlvGcmempoLTE5y";

  const fridgeRef = firebase
    .firestore()
    .collection(`/users/${userId}/currentFridge`);

  const snapshot = await fridgeRef.get();

  let selectedItem = {};

  snapshot.forEach((doc) => {
    if (doc.id === productId) {
      selectedItem = {
        expirationDate: doc.data().expirationDate,
        allergens: doc.data().allergens,
        dietFlags: doc.data().dietFlags,
        name: doc.data().name,
        quantity: doc.data().quantity,
        protein: doc.data().protein,
        carbs: doc.data().protein,
        fat: doc.data().fat
      };
    }
  });
  dispatch(_setSingleFridgeItem(selectedItem));
};

const singleFridgeItemReducer = (state = singleFridgeItemState, action) => {
  switch (action.type) {
    case SET_SINGLE_FRIDGE_ITEM: {
      return { ...state, singleFridgeItemState: action.item };
    }
    default:
      return state;
  }
};

export default singleFridgeItemReducer;
