import * as React from "react";
import { Text, View } from "react-native";

export default function SingleFridgeScreen({ route }) {
  const { name, expiration } = route.params;
  return (
    <View
      style={{
        flex: 1,
        marginTop: 30,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40, marginBottom: 30 }}>Single Page</Text>
      <Text style={{ fontSize: 28 }}>Name: {name}</Text>
      <Text style={{ fontSize: 20 }}>Exporation: {expiration}</Text>
    </View>
  );
}
