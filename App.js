import React from 'react';
import BarcodeScreen from './src/screens/BarcodeScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import GlobalProvider from './src/store/Context';

export default function App() {
  return (
    <GlobalProvider>
      <LoginScreen />
    </GlobalProvider>
  );
}
