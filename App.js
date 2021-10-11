import React from "react";
import BarcodeScreen from "./src/screens/BarcodeScreen";
import GlobalProvider from "./src/store/Context";
import SingleFridgeItemScreen from "./src/screens/SingleFridgeItemScreen.js";

export default function App() {
  return (
    <GlobalProvider>
      <SingleFridgeItemScreen />
      {/* <BarcodeScreen /> */}
    </GlobalProvider>
  );
}
