import React from "react";
import BarcodeScreen from "./src/screens/BarcodeScreen";
import { GlobalProvider } from "./src/store/Context";

export default function App() {
  return (
    <GlobalProvider>
      <BarcodeScreen />
    </GlobalProvider>
  );
}
