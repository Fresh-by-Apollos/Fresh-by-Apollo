import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from './Settings';

const SettingsStack = createNativeStackNavigator();

export default function SettingsNav() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsHome"
        component={Settings}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#4C956C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </SettingsStack.Navigator>
  );
}
