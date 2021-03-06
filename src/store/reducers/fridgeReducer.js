import firebase from "../../firebase/firebase";
import Toast from "react-native-toast-message";

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
export const editFridgeItem = async (id, amount, newDate, storageType) => {
  try {
    const userId = firebase.auth().currentUser.uid;
    const fridgeItem = firebase
      .firestore()
      .collection(`/users/${userId}/currentFridge`)
      .doc(id);

    await fridgeItem
      .update({
        servings: Number(amount),
        expirationDate: newDate,
        storage: storageType,
      })
      .then(() =>
        Toast.show({
          position: "top",
          topOffset: 80,
          type: "success",
          text1: `Item updated successfully!`,
          visibilityTime: 950,
          autoHide: true,
        })
      )
      .catch(() =>
        Toast.show({
          position: "top",
          topOffset: 80,
          type: "error",
          text1: `Error updating item`,
          visibilityTime: 950,
          autoHide: true,
        })
      );
  } catch (error) {
    return false;
  }
};

export const fetchFridgeItems = async (dispatch) => {
  try {
    const userId = firebase.auth().currentUser.uid;
    const fridgeRef = firebase
      .firestore()
      .collection(`/users/${userId}/currentFridge`)
      .orderBy("expirationDate", "asc");
    const snapshot = await fridgeRef.get();
    const resultArray = [];
    snapshot.forEach((doc) => {
      resultArray.push({
        id: doc.id,
        imageUrl: doc.data().image,
        name: doc.data().name,
        servings: doc.data().servings,
        expirationDate: doc.data().expirationDate,
        allergens: doc.data().allergens,
        dietFlags: doc.data().dietFlags,
        protein: doc.data().protein,
        carbs: doc.data().carbs,
        fat: doc.data().fat,
        barcode: doc.data().barcode,
        dateAdded: doc.data().dateAdded,
        storage: doc.data().storage,
        fridgeItemID: doc.data().fridgeItemId,
      });
    });
    dispatch(_setFridge(resultArray));
  } catch (error) {
    return `Error: ${error.message} || fetchFridgeItems`;
  }
};

const addPastFridgeItem = async (info, amount) => {
  try {
    const userId = firebase.auth().currentUser.uid;
    const fridgeRef = firebase
      .firestore()
      .collection(`/users/${userId}/pastFridge`);

    const snapshot = await fridgeRef.get();

    const result = [];
    snapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    const dateParsed = new Date(
      info.expirationDate.seconds * 1000
    ).toLocaleDateString("en-US");

    const resultArray = result.filter(
      (doc) =>
        Number(doc.barcode) === Number(info.barcode) &&
        new Date(doc.expirationDate.seconds * 1000).toLocaleDateString(
          "en-US"
        ) == dateParsed &&
        doc.wasConsumed === info.wasConsumed &&
        doc.name === info.name
    );

    if (resultArray.length > 0) {
      const fridgeItem = firebase
        .firestore()
        .collection(`/users/${userId}/pastFridge`)
        .doc(resultArray[0].id);

      await fridgeItem.update({
        servings: firebase.firestore.FieldValue.increment(amount),
      });
    } else {
      // Add a new document in collection "pastFridge"
      firebase
        .firestore()
        .collection(`users/${userId}/pastFridge`)
        .doc()
        .set({
          image: info.imageUrl,
          name: info.name,
          expirationDate: info.expirationDate,
          allergens: info.allergens,
          dietFlags: info.dietFlags,
          barcode: info.barcode,
          dateAdded: info.dateAdded,
          protein: info.protein,
          fat: info.fat,
          carbs: info.carbs,
          servings: amount,
          wasConsumed: info.wasConsumed,
          dateHandled: new Date(),
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateFridgeItem = async (
  id,
  amount,
  consumedAll,
  fridgeIteminfo
) => {
  try {
    const userId = firebase.auth().currentUser.uid;
    const fridgeItem = firebase
      .firestore()
      .collection(`/users/${userId}/currentFridge`)
      .doc(id);

    if (consumedAll) {
      await fridgeItem.delete();

      fridgeIteminfo.wasConsumed
        ? Toast.show({
            position: "bottom",
            bottomOffset: 90,
            type: "success",
            text1: `${fridgeIteminfo.name} consumed`,
            visibilityTime: 600,
            autoHide: true,
          })
        : Toast.show({
            position: "bottom",
            bottomOffset: 90,
            type: "error",
            text1: fridgeIteminfo.name,
            text2: "was removed",
            visibilityTime: 600,
            autoHide: true,
          });
    } else {
      await fridgeItem.update({
        servings: firebase.firestore.FieldValue.increment(-Number(amount)),
      });

      Toast.show({
        position: "bottom",
        bottomOffset: 90,
        type: "success",
        text1: `${amount} ${fridgeIteminfo.name} consumed`,
        visibilityTime: 600,
        autoHide: true,
      });
    }

    addPastFridgeItem(fridgeIteminfo, amount);
  } catch (error) {}
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
