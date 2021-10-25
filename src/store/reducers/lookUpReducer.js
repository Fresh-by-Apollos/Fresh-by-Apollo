import firebase from "../../firebase/firebase";
import axios from "axios";
import { SPOONACULAR_KEY } from '@env'
import Toast from "react-native-toast-message";

// fridgeState
export const lookUpItem = {};

// Action Types
const ADD_LOOKUP_ITEM = "ADD_LOOKUP_ITEM";
const REMOVE_LOOKUP_ITEM = "REMOVE_LOOKUP_ITEMS";

// Action Creators
const _addLookupItem = (item) => {
  return {
    type: ADD_LOOKUP_ITEM,
    item,
  };
};
const _removeAll = () => {
  return {
    type: REMOVE_LOOKUP_ITEM,
    payload: {},
  };
};

export const addLookupItem = async (info) => {
  try {
    const userId = firebase.auth().currentUser.uid;
    const fridgeRef = firebase
      .firestore()
      .collection(`/users/${userId}/currentFridge`);

    const snapshot = await fridgeRef.get();
    const result = [];
    snapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    const dateParsed = `${
      info.expirationDate.getMonth() + 1
    }/${info.expirationDate.getDate()}/${info.expirationDate.getFullYear()}`;

    const resultArray = result.filter(
      (doc) =>
        Number(doc.fridgeItemID) === Number(info.fridgeItemId) &&
        new Date(doc.expirationDate.seconds * 1000).toLocaleDateString(
          "en-US"
        ) == dateParsed &&
        doc.fridgeItemID !== 0
    );

    if (resultArray.length > 0) {
      const fridgeItem = firebase
        .firestore()
        .collection(`/users/${userId}/currentFridge`)
        .doc(resultArray[0].id);

      await fridgeItem.update({
        servings: firebase.firestore.FieldValue.increment(info.servings),
      });
      Toast.show({
        position: "top",
        topOffset: 90,
        type: "success",
        text1: resultArray[0].name,
        text2: `added to ${
          info.storageType.charAt(0).toUpperCase() + info.storageType.slice(1)
        }`,
        visibilityTime: 600,
        autoHide: true,
      });
    } else {
      firebase
        .firestore()
        .collection(`users/${userId}/currentFridge`)
        .doc()
        .set({
          image: info.image,
          name: info.name,
          expirationDate: info.expirationDate,
          allergens: [],
          dietFlags: [],
          barcode: 0,
          dateAdded: new Date(),
          protein: info.protein,
          fat: info.fat,
          carbs: info.carbs,
          servings: info.servings,
          storage: info.storageType,
          fridgeItemID: info.fridgeItemId,
        })
        .then(() => {
          console.log("Document successfully written!");
          Toast.show({
            position: "top",
            topOffset: 90,
            type: "success",
            text1: info.name,
            text2: `added to ${
              info.storageType.charAt(0).toUpperCase() +
              info.storageType.slice(1)
            }`,
            visibilityTime: 600,
            autoHide: true,
          });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLookupItem = async (itemName, dispatch) => {
  try {
    const item = await axios.get(
      `https://api.spoonacular.com/food/ingredients/search?query=${itemName}&apiKey=${SPOONACULAR_KEY}`
      );
    const itemInfo = await axios.get(
      `https://api.spoonacular.com/food/ingredients/${item.data.results[0].id}/information?amount=1&apiKey=${SPOONACULAR_KEY}`
      );

    const itemImageURL = `https://spoonacular.com/cdn/ingredients_100x100/${item.data.results[0].image}`;

    const { id, name, nutrition } = itemInfo.data;

    let protein = nutrition.nutrients.filter((obj) => obj.title === 'Protein')
    let carbs = nutrition.nutrients.filter((obj) => obj.title === 'Carbohydrates')
    let fat = nutrition.nutrients.filter((obj) => obj.title === 'Fat')


    const data = {
      name,
      fridgeItemId: id,
      image: itemImageURL,
      carbs: carbs[0].amount,
      protein: protein[0].amount,
      fat: fat[0].amount,
    };

    dispatch(_addLookupItem(item.data.results[0].id ? data : {}));
  } catch (error) {
    dispatch(_addLookupItem({}));
  }
};

export const removeAllLookupItems = async (dispatch) => {
  try {
    dispatch(_removeAll());
  } catch (error) {
    console.log(error);
  }
};

// Reducers
const lookUpReducer = (state = lookUpItem, action) => {
  switch (action.type) {
    case ADD_LOOKUP_ITEM: {
      return {
        ...state,
        lookUpItem: { ...action.item },
      };
    }
    case REMOVE_LOOKUP_ITEM: {
      return { ...state, lookUpItem: action.payload };
    }
    default:
      return state;
  }
};

export default lookUpReducer;
