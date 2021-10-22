import firebase from "../../firebase/firebase";
import axios from "axios";
import { barcodeSnapshot } from "../../../barcodeInfo";

// fridgeState
export const scannedItem = {};

// Action Types
const SET_SCANNED_ITEM = "SET_SCANNED_ITEM";

// Action Creators
const _setScannedItem = (item) => {
  return {
    type: SET_SCANNED_ITEM,
    item,
  };
};

export const addFridgeItem = async (info) => {
  try {
    // const userId = "hYkI13zMlyg3JAi1FL7xBryYydU2"; // User backup
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
        Number(doc.barcode) === Number(info.barcode) &&
        new Date(doc.expirationDate.seconds * 1000).toLocaleDateString(
          "en-US"
        ) == dateParsed
    );

    if (resultArray.length > 0) {
      const fridgeItem = firebase
        .firestore()
        .collection(`/users/${userId}/currentFridge`)
        .doc(resultArray[0].id);

      await fridgeItem.update({
        servings: firebase.firestore.FieldValue.increment(info.servings),
      });
    } else {
      // Add a new document in collection "currentFridge"
      firebase
        .firestore()
        .collection(`users/${userId}/currentFridge`)
        .doc()
        .set({
          image: info.imageUrl,
          name: info.name,
          expirationDate: info.expirationDate,
          allergens: info.allergens,
          dietFlags: info.dietFlags,
          barcode: info.barcode,
          dateAdded: new Date(),
          protein: info.protein,
          fat: info.fat,
          carbs: info.carbs,
          servings: info.servings,
          storage: info.storageType,
          freshItem: false,
          fridgeItemID: 0,
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

/* Future Goals: Make a table/doc that holds previously scanned barcode and there images
    to limit the amt of calls we make to barcodespider for images
*/
export const getFoodData = async (barcode_num, dispatch) => {
  /*-------- !IMPORTANT! uncomment below to REAL data ---------*/

  let result = await axios
    .get(
      `https://chompthis.com/api/v2/food/branded/barcode.php?api_key=AzytazSl0UlIf1Kym&code=${barcode_num}`
    )
    .then(async (result) => {
      let imageResult = await axios.get(
        `https://api.barcodespider.com/v1/lookup?token=ea377961c5a80992486d&upc=${barcode_num}`
      );
      const imageUrl = imageResult.data.item_attributes.image;
      const { name, barcode, allergens, nutrients, diet_flags, diet_labels } =
        result.data.items[0];
      const servingSize = Number(result.data.items[0].serving.size);

      const macros = nutrients.reduce(function (acc, nutrient) {
        const name = nutrient.name;
        if (
          name == "Protein" ||
          name == "Total lipid (fat)" ||
          name == "Carbohydrate, by difference" ||
          name.includes("Carb")
        ) {
          !acc[name] && (acc[name] = (nutrient.per_100g / 100) * servingSize);
        }
        return acc;
      }, {});

      // const dietLabels = Object.keys(diet_labels).map(function (label) {
      //   return { [label]: diet_labels[label].is_compatible };
      // });

      const dietLabels = Object.keys(diet_labels).filter(
        (label) => diet_labels[label].is_compatible
      );

      const dietFlags = diet_flags.map((additive) => additive.ingredient);

      const data = {
        name,
        allergens,
        imageUrl,
        dietFlags,
        barcode: barcode,
        dietLabels,
        protein: macros["Protein"] || 0,
        carbs: macros["Carbohydrate, by difference"] || 0,
        fat: macros["Total lipid (fat)"] || 0,
      };
      dispatch(_setScannedItem(data));
    })
    .catch(dispatch(_setScannedItem({})));
};

export const removeScannedItem = async (dispatch) => {
  try {
    dispatch(_setScannedItem({}));
  } catch (error) {
    console.log(error);
  }
};

// Reducers
const barcodeReducer = (state = scannedItem, action) => {
  switch (action.type) {
    case SET_SCANNED_ITEM: {
      return { ...state, scannedItem: { ...action.item } };
    }
    default:
      return state;
  }
};

export default barcodeReducer;
