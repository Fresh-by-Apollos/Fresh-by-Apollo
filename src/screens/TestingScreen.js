import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useStorage } from "../store/Context";
import { fetchFridgeItems } from "../store/reducers/fridgeReducer";

function TestingScreen() {
  const { fridgeState, dispatch } = useStorage();

  const [fridgeText, setFridgeText] = useState("Testing state management..");

  const testCallToFirestore = async () => {
    try {
      setFridgeText(JSON.stringify(fridgeState));
    } catch (err) {
      setFridgeText(JSON.stringify(err));
      console.log(err);
    }
  };

  // Similar to Component did mount;
  // Will be called agian is variable in brackets change
  useEffect(() => {
    fetchFridgeItems(dispatch);
  }, [fridgeState]);

  return (
    <View>
      <Text style={{ marginTop: 20 }}>{fridgeText}</Text>

      <Text style={{ marginTop: 20 }}>Press the button below</Text>

      <Button onPress={testCallToFirestore} title="Firestore  <-- Click Me" />
    </View>
  );
}

export default TestingScreen;
