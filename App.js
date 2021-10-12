import React from 'react';
import GlobalProvider from './src/store/Context';
import Navigation from './Navigation';

export default function App() {
  return (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
  );
}
