import React from "react";
import { View, Text, SafeAreaView } from "react-native";

export default Settings = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40 }}>Settings!</Text>
    </SafeAreaView>
  );
};
