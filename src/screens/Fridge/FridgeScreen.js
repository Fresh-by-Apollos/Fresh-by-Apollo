import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { useStorage } from "../../store/Context";
import { fetchFridgeItems } from "../../store/reducers/fridgeReducer";
import styles from "./fridge-style";

function FridgeScreen({ navigation }) {
  const { fridgeState, dispatch } = useStorage();

  useEffect(() => {
    fetchFridgeItems(dispatch);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>My Fridge</Text> */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {fridgeState.length === 0 ? (
          <View>
            <Text style={styles.isEmpty}>Your fridge is empty!</Text>
          </View>
        ) : (
          <View style={styles.notEmpty}>
            {fridgeState.map((item) => (
              <View key={item.name} style={styles.fridgeItems}>
                <Image style={styles.image} source={{ uri: item.imageUrl }} />
                <Text>{item.name}</Text>
                <Text>Servings: {item.servings}</Text>
                <Text>
                  Expiration Date:{" "}
                  {new Date(
                    item.expirationDate.seconds * 1000
                  ).toLocaleDateString("en-US")}
                </Text>
                <Text>Allergens: {item.allergens}</Text>
                <Text>Diet Flags: {item.dietFlags}</Text>
                <Button
                  title="show"
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate("Selected Item", {
                      name: item.name,
                      expirationDate: item.expirationDate,
                      servings: item.servings,
                      allergens: item.allergens,
                      dietFlags: item.dietFlags,
                      protein: item.protein,
                      carbs: item.carbs,
                      fat: item.fat,
                      imageUrl: item.imageUrl,
                    });
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FridgeScreen;
