import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import styles from "./single-fridge-item-style";

//firebase main

//firebase backup

function SingleFridgeItemScreen() {
  const { name, expiration, allergens, dietFlags, protein, carbs, fat } = route.params

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Selected Item</Text>
      <ScrollView>
        <View style={styles.fridgeItems}>
          <Text>{name}</Text>
          <Text>Servings: {servings}</Text>
          {/* <Text>Expiration Date: {new Date(expirationDate.seconds * 1000).toLocaleDateString("en-US")}</Text> */}
          <Text>Allergens: {allergens}</Text>
          <Text>Diet Flags: {dietFlags}</Text>
          <Text>Protein: {protein}g</Text>
          <Text>Carbs: {carbs}g</Text>
          <Text>Fat: {fat}g</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SingleFridgeItemScreen;
