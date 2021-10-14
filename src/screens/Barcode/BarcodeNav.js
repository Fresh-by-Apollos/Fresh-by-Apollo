import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import BarcodeScreen from "./BarcodeScreen";
import InfoScreen from "./InfoScreen";
import Calender from "./Calender";

const BarcodeStack = createNativeStackNavigator();

export default function BarcodeNav() {
  return (
    <BarcodeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#2C6E49",
        },
        headerTitle: "ADD TO FRIDGE",
        headerTitleStyle: { color: "white", fontWeight: "bold", fontSize: 25 },
      }}
    >
      <BarcodeStack.Screen name="BarcodeScreen" component={BarcodeScreen} />
      <BarcodeStack.Screen name="BarcodeInfoScreen" component={InfoScreen} />
      <BarcodeStack.Screen name="Calender" component={Calender} />
    </BarcodeStack.Navigator>
  );
}
