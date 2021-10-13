import React from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import styles from "./single-fridge-item-style";

//firebase main

//firebase backup

function SingleFridgeItemScreen({ route }) {
  const {
    name,
    imageUrl,
    expirationDate,
    servings,
    allergens,
    dietFlags,
    protein,
    carbs,
    fat,
  } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Selected Item</Text> */}
      <ScrollView>
        <View>
          <SafeAreaView style={styles.nutrientsContainer}>
            <Text style={styles.nutritionText}>Protein: {protein}g</Text>
            <Text style={styles.nutritionText}>Carbs: {carbs}g</Text>
            <Text style={styles.nutritionText}>Fat: {fat}g</Text>
          </SafeAreaView>
          <SafeAreaView style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </SafeAreaView>
          <SafeAreaView style={styles.otherData}>
            <Text style={styles.baseText}>Item Name: {name}</Text>
            <Text> </Text>
            <Text style={styles.baseText}>Servings: {servings}</Text>
            <Text style={styles.baseText}>
              Expiration Date:{" "}
              {new Date(expirationDate.seconds * 1000).toLocaleDateString(
                "en-US"
              )}
            </Text>
            <Text> </Text>
            <Text style={styles.baseText}>Allergens: {allergens.length ? allergens.join(', ') : 'N/A'}</Text>
            <Text style={styles.baseText}>
              Diet Flags:{" "}
              {dietFlags.length ? dietFlags.join(", ") : "N/A"}
            </Text>
          </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SingleFridgeItemScreen;
