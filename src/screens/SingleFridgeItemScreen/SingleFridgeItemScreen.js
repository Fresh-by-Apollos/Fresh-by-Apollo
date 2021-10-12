import React, { useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useStorage } from "../../store/Context";
import { fetchSingleFridgeItem } from "../../store/reducers/singleFridgeItemReducer";
import styles from "./single-fridge-item-style";

//firebase main

//firebase backup

function SingleFridgeItemScreen() {
  const { singleFridgeItemState, dispatch } = useStorage();

  useEffect(() => {
    fetchSingleFridgeItem(dispatch);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Selected Item</Text>
      <ScrollView>
        <View style={styles.fridgeItems}>
          <Text>{singleFridgeItemState.name}</Text>
          <Text>Number of Servings: {singleFridgeItemState.quantity}</Text>
          {/* <Text>Expiration Date: {new Date(singleFridgeItemState.expirationDate.seconds * 1000).toLocaleDateString("en-US")}</Text> */}
          <Text>Allergens: {singleFridgeItemState.allergens}</Text>
          <Text>Diet Flags: {singleFridgeItemState.dietFlags}</Text>
          <Text>Protein: {singleFridgeItemState.protein}g</Text>
          <Text>Carbs: {singleFridgeItemState.carbs}g</Text>
          <Text>Fat: {singleFridgeItemState.fat}g</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SingleFridgeItemScreen;
