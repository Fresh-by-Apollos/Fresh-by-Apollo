import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FridgeScreen from "./FridgeScreen";
import SingleFridgeItemScreen from "../SingleFridgeItemScreen/SingleFridgeItemScreen";

const FridgeStack = createNativeStackNavigator();

export default function FridgeNav() {
  return (
    <FridgeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#2C6E49",
          // width: 10,
        },

        headerTitle: "FRIDGE",
        headerTitleStyle: { color: "white", fontWeight: "bold", fontSize: 25 },
      }}
    >
      <FridgeStack.Screen name="My Fridge" component={FridgeScreen} />
      <FridgeStack.Screen
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
        name="Selected Item"
        component={SingleFridgeItemScreen}
      />
    </FridgeStack.Navigator>
  );
}
