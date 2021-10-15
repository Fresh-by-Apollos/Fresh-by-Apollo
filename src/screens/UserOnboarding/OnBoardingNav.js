import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DietRestrictions from './DietRestrictions';
import Allergies from './Allergies';

const onBoardingStack = createNativeStackNavigator();

export default function OnBoardingNav() {
  return (
    <onBoardingStack.Navigator screenOptions={{ headerShown: false }}>
      <onBoardingStack.Screen
        name="DietRestrictions"
        component={DietRestrictions}
      />
      <onBoardingStack.Screen name="Allergies" component={Allergies} />
    </onBoardingStack.Navigator>
  );
}
