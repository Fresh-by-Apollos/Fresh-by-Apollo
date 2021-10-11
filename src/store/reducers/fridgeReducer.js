import firebase from "../../firebase/firebase";

// fridgeState
export const fridgeState = [];

// Action Types
const SET_FRIDGE = "SET_FRIDGE";

// Action Creators
const _setFridge = (items) => {
  return {
    type: SET_FRIDGE,
    items,
  };
};

// Thunks
// export const fetchFridgeItems = async (dispatch) => {
//   const userId = "2SbLcxDpmJHXKpJ7bEqV";
//   const fridgeRef = firebase
//     .firestore()
//     .collection(`/users/${userId}/currentFridge`);

//   const snapshot = await fridgeRef.get();

//   let resultArr = [];

//   snapshot.forEach((doc) => {
//     resultArr.push({
//       FridgeItem: doc.data().name,
//       allergens: doc.data().allergens,
//     });
//   });
//   dispatch(_setFridge(resultArr));
// };

export const fetchFridgeItems = async(dispatch) => {
  try {
    const userId = "2SbLcxDpmJHXKpJ7bEqV";
    const fridgeRef = firebase
      .firestore()
      .collection(`/users/${userId}/currentFridge`);
    const snapshot = await fridgeRef.get();
    const resultArray = [];

    snapshot.forEach((doc) => {
      resultArray.push({
        name: doc.data().name,
        quantity: doc.data().quantity,
        expirationDate: doc.data().expirationDate,
        allergens: doc.data().allergens,
        dietFlags: doc.data().dietFlags
      })
    })
    dispatch(_setFridge(resultArray))

  } catch (error) {
    return `Error: ${error.message} || fetchFridgeItems`
  }
}

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
