import React from "react";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// libraries
import Toast, {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Navigation
import FridgeNav from "./src/screens/Fridge/FridgeNav";
import LoginNav from "./src/screens/LoginScreen/LoginNav";
import BarcodeNav from "./src/screens/Barcode/BarcodeNav";
import SettingsNav from "./src/screens/Settings/SettingsNav";
import OnBoardingNav from "./src/screens/UserOnboarding/OnBoardingNav";

// Context
import { useStorage } from "./src/store/Context";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { userState } = useStorage();

  const toastConfig = {
    success: (props) => (
      <SuccessToast
        {...props}
        text1Style={{ marginRight: "10%" }}
        text2Style={{ fontSize: 14 }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{ marginRight: "10%" }}
        text2Style={{ fontSize: 14 }}
      />
    ),
    info: (props) => (
      <InfoToast
        {...props}
        text1Style={{ marginRight: "10%" }}
        text2Style={{ fontSize: 14 }}
      />
    ),
  };

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
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      )}
    </>
  );
}
