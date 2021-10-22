import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FridgeScreen from "./FridgeScreen";
import BarcodeScreen from "../Barcode/BarcodeScreen";
import StatisticsScreen from "../Statistics/StatisticsScreen";
import SingleFridgeItemScreen from "../SingleFridgeItemScreen/SingleFridgeItemScreen";
import { Button } from "react-native";

const FridgeStack = createNativeStackNavigator();

export default function FridgeNav() {
  return (
    <FridgeStack.Navigator
      screenOptions={{
        headerShown: true,
        title: "FRIDGE",
        headerStyle: {
          backgroundColor: "#4C956C",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <FridgeStack.Screen name="My Fridge" component={FridgeScreen} />
      <FridgeStack.Screen
        options={{
          headerTitle: "",
        }}
        name="Selected Item"
        component={SingleFridgeItemScreen}
      />
      <FridgeStack.Screen
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
        name="BarcodeScreen"
        component={BarcodeScreen}
      />

      <FridgeStack.Screen
        options={{
          headerTitle: "STATISTICS",
          headerBackTitleVisible: false,
          headerLeft: () => <Button title="" />,
        }}
        name="StatisticsScreen"
        component={StatisticsScreen}
      />
    </FridgeStack.Navigator>
  );
}
