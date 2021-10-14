import firebase from "../../firebase/firebase";
import axios from "axios";
import { stuff } from "../../../barcodeInfo";

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
    // Add a new document in collection "cities"
    const userId = "hYkI13zMlyg3JAi1FL7xBryYydU2";
    firebase
      .firestore()
      .collection(`users/${userId}/currentFridge`)
      .doc()
      .set({
        image: info.imageUrl,
        name: info.name,
        expirationDate: info.expirationDate,
        allergens: ["Test Apollos: Added Macros!! "],
        barcode: info.barcode,
        dateAdded: new Date(),
        protein: info.protein,
        fat: info.fat,
        carbs: info.carbs,
        servings: info.servings,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  } catch (error) {
    console.log(error);
  }
};

/* Future Goals: Make a table/doc that holds previously scanned barcode and there images
    to limit the amt of calls we make to barcodespider for images
*/
export const getFoodData = async (barcode_num, setText, dispatch) => {
  try {
    let result = await axios.get(
      `https://chompthis.com/api/v2/food/branded/barcode.php?api_key=AzytazSl0UlIf1Kym&code=${barcode_num}`
    );

    // let result = stuff;

    let imageResult = await axios.get(
      `https://api.barcodespider.com/v1/lookup?token=ea377961c5a80992486d&upc=${barcode_num}`
    );
    const imageUrl = imageResult.data.item_attributes.image;
    // .
    // Temporary for comformation on frontend
    // let itemName = JSON.stringify(result.data.items[0].name);
    // let code = JSON.stringify(result.data.items[0].barcode);
    // setText("Barcode: " + code + "  Name" + itemName);

    const { name, barcode, allergens, nutrients } = result.data.items[0];
    // const { name, barcode, allergens, nutrients } = result.items[0];

    // console.log(nutrients);
    const servingSize = Number(result.data.items[0].serving.size);
    let macros = nutrients.reduce(function (acc, nutrient) {
      const name = nutrient.name;
      if (
        name == "Protein" ||
        name == "Total lipid (fat)" ||
        name == "Carbohydrate, by difference"
      ) {
        !acc[name] && (acc[name] = (nutrient.per_100g / 100) * servingSize);
      }
      return acc;
    }, {});

    // const imageUrl =
    //   "https://d2d8wwwkmhfcva.cloudfront.net/800x/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_203d8e83-8084-4983-a480-d87c2662555e.jpeg";

    const data = {
      name,
      allergens,
      imageUrl,
      barcode: barcode,
      protein: macros["Protein"],
      carbs: macros["Carbohydrate, by difference"],
      fat: macros["Total lipid (fat)"],
    };
    console.log(data, "<----- Lets Get It!!");

    dispatch(_setScannedItem(data));
  } catch (error) {
    console.log(error);
  }
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
