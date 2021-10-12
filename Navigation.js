import React, { useEffect, useState } from 'react';
import { useStorage } from './src/store/Context';
import { fetchUser } from './src/store/reducers/userReducer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import firebase from './src/firebase/firebase';

// Navigation
import FridgeNav from './src/screens/Fridge/FridgeNav';
import BarcodeNav from './src/screens/Barcode/BarcodeNav';

// Screens
import Settings from './src/screens/Settings/Settings';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { userState } = useStorage();

  return (
    <>
      {!userState ? (
        <LoginScreen />
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#4C956C',
              // tabBarInactiveTintColor: "lightgray",
              headerShown: false,
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
                tabBarLabel: 'Fridge',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="fridge"
                    color={color}
                    size={28}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Barcode"
              component={BarcodeNav}
              options={{
                tabBarLabel: 'Barcode',
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
              component={Settings}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color }) => (
                  <Ionicons name="settings-outline" size={28} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
