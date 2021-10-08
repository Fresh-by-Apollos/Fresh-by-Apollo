import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import firebase from "../firebase/firebase";
import { useStorage } from "../store/Context";
import { fetchFridgeItems } from "../store/reducers/fridgeReducer";

function TestingScreen() {
  const { fridgeState, dispatch } = useStorage();
  const [text, setText] = useState("Press Testing Button");
  const [fridgeText, setFridgeText] = useState("Testing state management..");

  const testCallToFirestore = async () => {
    try {
      // await fetchFridgeItems(dispatch);

      // setFridgeText(JSON.stringify(fridgeState));
      console.log(fridgeState);

      setText(JSON.stringify(fridgeState));
    } catch (err) {
      setText(JSON.stringify(err));
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFridgeItems(dispatch);
  }, [fridgeState]);

  return (
    <View>
      <Text style={{ marginTop: 20 }}>{text}</Text>
      <Text>{JSON.stringify(fridgeState)}</Text>
      <Text style={{ marginTop: 20 }}>{fridgeText}</Text>

      <Button onPress={testCallToFirestore} title="Firestore  <-- Click Me" />
    </View>
  );
}

export default TestingScreen;
