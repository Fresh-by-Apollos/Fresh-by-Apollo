import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from './Settings';
import EditUserDetails from './EditUserDetails';
import EditAllergies from './EditAllergies';
import EditDietRestrictions from './EditDietRestrictions';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

const SettingsStack = createNativeStackNavigator();

export default function SettingsNav() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsHome"
        component={Settings}
        options={{
          title: 'SETTINGS',
          headerStyle: {
            backgroundColor: '#4C956C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <SettingsStack.Screen
        name="EditUserDetails"
        component={EditUserDetails}
        options={{
          title: 'Edit User Details',
          headerStyle: {
            backgroundColor: '#4C956C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <SettingsStack.Screen
        name="EditAllergies"
        component={EditAllergies}
        options={{
          title: 'Edit Allergies',
          headerStyle: {
            backgroundColor: '#4C956C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <SettingsStack.Screen
        name="EditDietRestrictions"
        component={EditDietRestrictions}
        options={{
          title: 'Edit Diet Restrictions',
          headerStyle: {
            backgroundColor: '#4C956C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <SettingsStack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{
          title: 'Change Email',
          headerStyle: {
            backgroundColor: '#4C956C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <SettingsStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
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
