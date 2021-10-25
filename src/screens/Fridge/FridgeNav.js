import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FridgeScreen from './FridgeScreen';
import BarcodeScreen from '../Barcode/BarcodeScreen';
import StatisticsScreen from '../Statistics/StatisticsScreen';
import SingleFridgeItemScreen from '../SingleFridgeItemScreen/SingleFridgeItemScreen';
import { Button, Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Topbar from './components/Topbar';
const FridgeStack = createNativeStackNavigator();

export default function FridgeNav() {
  return (
    <FridgeStack.Navigator
      screenOptions={{
        headerShown: true,
        title: 'FRIDGE',
        headerStyle: {
          backgroundColor: '#4C956C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <FridgeStack.Screen
        options={({ navigation, route }) => ({
          headerRight: () => (
            <Pressable
              style={{ marginRight: 8 }}
              onPress={(props) => navigation.navigate('StatisticsScreen')}
            >
              <Foundation name="graph-bar" size={32} color="white" />
              {/* <FontAwesome5
                name="chart-bar"
                size={32}
                color="white"
              ></FontAwesome5> */}
            </Pressable>
          ),
        })}
        name="My Fridge"
        component={Topbar}
      />
      <FridgeStack.Screen
        options={{
          headerTitle: '',
        }}
        name="Selected Item"
        component={SingleFridgeItemScreen}
      />
      <FridgeStack.Screen
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
        }}
        name="BarcodeScreen"
        component={BarcodeScreen}
      />

      <FridgeStack.Screen
        options={{
          headerTitle: 'STATISTICS',
          // headerBackTitleVisible: false,
          // headerLeft: () => <Button title="" />,
        }}
        name="StatisticsScreen"
        component={StatisticsScreen}
      />
    </FridgeStack.Navigator>
  );
}
