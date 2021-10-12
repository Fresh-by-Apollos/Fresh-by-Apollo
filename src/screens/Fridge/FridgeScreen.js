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
      <Text style={styles.title}>My Fridge</Text>
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
                    navigation.navigate("SingleFridgeItemScreen", {
                      name: item.name,
                      expiration: item.expirationDate.seconds * 1000,
                      quantity: item.quantity,

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
