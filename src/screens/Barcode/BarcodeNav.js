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
        title: 'ADD TO FRIDGE',
        headerStyle: {
          backgroundColor: '#4C956C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <BarcodeStack.Screen name="BarcodeScreen" component={BarcodeScreen} />
      <BarcodeStack.Screen name="BarcodeInfoScreen" component={InfoScreen} />
      <BarcodeStack.Screen name="Calender" component={Calender} />
    </BarcodeStack.Navigator>
  );
}
