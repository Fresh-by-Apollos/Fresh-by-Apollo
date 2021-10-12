import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import BarcodeScreen from "./BarcodeScreen";

const BarcodeStack = createNativeStackNavigator();

export default function BarcodeNav() {
  return (
    <BarcodeStack.Navigator>
      <BarcodeStack.Screen name="BarcodeScreen" component={BarcodeScreen} />
    </BarcodeStack.Navigator>
  );
}
