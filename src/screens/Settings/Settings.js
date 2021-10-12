import React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { signOut } from '../../firebase/auth/auth';

export default Settings = () => {
  async function onSignOut() {
    await signOut();
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 40 }}>Settings!</Text>
      <TouchableOpacity onPress={() => onSignOut()}>
        <Text style={{ fontSize: 40 }}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
