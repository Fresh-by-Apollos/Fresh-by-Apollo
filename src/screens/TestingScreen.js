import React, { useEffect, useState } from "react";
import { useStorage } from "../store/Context";
import { View, Text, Button } from "react-native";
import firebase from "../firebase/firebase";

function TestingScreen() {
  const [text, setText] = useState("Press Testing Button");
  const { products } = useStorage(); // *Important, grabbing info from React Hooks Redux clone

  const testCallToFirestore = async () => {
    try {
      const userId = "2SbLcxDpmJHXKpJ7bEqV";

      const fridgeRef = firebase
        .firestore()
        .collection(`/users/${userId}/currentFridge`);

      const userRef = firebase.firestore().collection("users").doc(userId);

      const userSnapshot = await userRef.get();
      const snapshot = await fridgeRef.get();

      let resultArr = [];

      resultArr.push({
        FirstName: userSnapshot.data().firstName,
        allergies: userSnapshot.data().allergies,
      });

      snapshot.forEach((doc) => {
        resultArr.push({
          FridgeItem: doc.data().name,
          allergens: doc.data().allergens,
        });
      });

      setText(JSON.stringify(resultArr));
    } catch (err) {
      setText(JSON.stringify(err));
      console.log(err);
    }
  };

  return (
    <View>
      <Text>
        {"Testing React Hooks Substitute for Redux: " +
          JSON.stringify(products[0].title)}
      </Text>

      <Text style={{ marginTop: 20 }}>{text}</Text>

      <Button onPress={testCallToFirestore} title="Firestore  <-- Click Me" />
    </View>
  );
}

export default TestingScreen;
