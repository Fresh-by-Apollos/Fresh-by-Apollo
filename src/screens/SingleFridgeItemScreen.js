import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useStorage } from "../store/Context";
import { fetchSingleFridgeItem } from "../store/reducers/singleFridgeItemReducer";

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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.notEmpty}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    backgroundColor: "#4C956C",
    color: "white",
    fontWeight: "bold",
  },
  scrollView: {},
  isEmpty: {
    fontSize: 20,
  },
  notEmpty: {
    flex: 1,
    flexDirection: "column",
  },
  fridgeItems: {},
});

export default SingleFridgeItemScreen;
