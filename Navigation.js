import React, { useEffect, useState } from 'react';
import { useStorage } from './src/store/Context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast, {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

// Navigation
import FridgeNav from './src/screens/Fridge/FridgeNav';
import BarcodeNav from './src/screens/Barcode/BarcodeNav';
import LoginNav from './src/screens/LoginScreen/LoginNav';
import OnBoardingNav from './src/screens/UserOnboarding/OnBoardingNav';

// Screens
import SettingsNav from './src/screens/Settings/SettingsNav';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { userState } = useStorage();

  const toastConfig = {
    success: (props) => (
      <SuccessToast
        {...props}
        text1Style={{ marginRight: '10%' }}
        text2Style={{ fontSize: 14 }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{ marginRight: '10%' }}
        text2Style={{ fontSize: 14 }}
      />
    ),
    info: (props) => (
      <InfoToast
        {...props}
        text1Style={{ marginRight: '10%' }}
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
              tabBarActiveTintColor: '#4C956C',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#4C956C',
              },

              tabBarStyle: {
                paddingBottom: 20,
                backgroundColor: 'white',
                height: 80,
              },
            }}
          >
            <Tab.Screen
              name="Fridge"
              component={FridgeNav}
              options={{
                tabBarLabel: '',
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
                tabBarLabel: '',
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
                tabBarLabel: '',
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
