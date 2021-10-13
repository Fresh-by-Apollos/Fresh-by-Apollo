import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FridgeScreen from "./FridgeScreen";
import SingleFridgeItemScreen from "../SingleFridgeItemScreen/SingleFridgeItemScreen";

const FridgeStack = createNativeStackNavigator();

export default function FridgeNav() {
  return (
    <FridgeStack.Navigator>
      <FridgeStack.Screen name="My Fridge" component={FridgeScreen} />
      <FridgeStack.Screen
        name="Selected Item"
        component={SingleFridgeItemScreen}
      />
    </FridgeStack.Navigator>
  );
}
