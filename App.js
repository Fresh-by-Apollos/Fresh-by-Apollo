import React from "react";
// import BarcodeScreen from "./src/screens/BarcodeScreen";
import GlobalProvider from "./src/store/Context";
import Nav from "./src/Nav";

import FridgeScreen from "./src/screens/Fridge/FridgeScreen";

export default function App() {
  return (
    <GlobalProvider>
      {/* <BarcodeScreen /> */}
      <Nav />
      {/* <FridgeScreen /> */}
    </GlobalProvider>
  );
}
