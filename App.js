import React from "react";
// import BarcodeScreen from "./src/screens/BarcodeScreen";
import GlobalProvider from "./src/store/Context";
import SingleFridgeItemScreen from "./src/screens/SingleFridgeItemScreen/SingleFridgeItemScreen.js";

import FridgeScreen from "./src/screens/Fridge/FridgeScreen";

export default function App() {
  return (
    <GlobalProvider>
      <SingleFridgeItemScreen />
      {/* <BarcodeScreen /> */}
      {/* <FridgeScreen /> */}
    </GlobalProvider>
  );
}
