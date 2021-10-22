import React, { useEffect, useState } from "react";
import { useStorage } from "./src/store/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getToken } from "./src/firebase/auth/auth";

// Navigation
import FridgeNav from "./src/screens/Fridge/FridgeNav";
import BarcodeNav from "./src/screens/Barcode/BarcodeNav";
import LoginNav from "./src/screens/LoginScreen/LoginNav";
import OnBoardingNav from "./src/screens/UserOnboarding/OnBoardingNav";

// Screens
import SettingsNav from "./src/screens/Settings/SettingsNav";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { userState } = useStorage();

  return (
    <>
      {!userState ? (
        <NavigationContainer>
          <LoginNav />
        </NavigationContainer>
      ) : !userState.onBoarded ? (
        <NavigationContainer>
          <OnBoardingNav />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#4C956C",
              headerShown: false,
              headerStyle: {
                backgroundColor: "#4C956C",
              },

              tabBarStyle: {
                paddingBottom: 20,
                backgroundColor: "white",
                height: 80,
              },
            }}
          >
            <Tab.Screen
              name="Fridge"
              component={FridgeNav}
              options={{
                tabBarLabel: "",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="fridge"
                    color={color}
                    size={40}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Barcode"
              component={BarcodeNav}
              options={{
                tabBarLabel: "",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    color={color}
                    size={40}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsNav}
              options={{
                tabBarLabel: "",
                tabBarIcon: ({ color }) => (
                  <Ionicons name="settings" size={40} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
