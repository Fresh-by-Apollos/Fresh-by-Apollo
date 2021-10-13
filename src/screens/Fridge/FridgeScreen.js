import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useStorage } from "../../store/Context";
import { fetchFridgeItems } from "../../store/reducers/fridgeReducer";
import styles from "./fridge-style";
import { formatDistance } from "date-fns";

function FridgeScreen({ navigation }) {
  const { fridgeState, dispatch, userState } = useStorage();

  useEffect(() => {
    fetchFridgeItems(dispatch, userState.uid);
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
              //key is upcCode + expiration date
              <TouchableOpacity
                key={
                  `${item.upcCode}` +
                  new Date(
                    item.expirationDate.seconds * 1000
                  ).toLocaleDateString("en-US")
                }
                style={styles.fridgeItems}
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
              >
                <SafeAreaView style={styles.imageContainer}>
                  <Image style={styles.image} source={{ uri: item.imageUrl }} />
                </SafeAreaView>
                <SafeAreaView style={styles.otherData}>
                  {/* capitalize first letter */}
                  <Text style={styles.itemNameText}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Text>
                  <Text> </Text>
                  <Text>Servings: {item.servings}</Text>
                  <Text>
                    Expires:{" "}
                    {formatDistance(
                      new Date(item.expirationDate.seconds * 1000),
                      new Date(),
                      { addSuffix: true }
                    )}
                  </Text>
                  <Text style={styles.baseText}>
                    Allergens:{" "}
                    {item.allergens.length ? item.allergens.join(", ") : "N/A"}
                  </Text>
                  <Text style={styles.baseText}>
                    Diet Flags:{" "}
                    {item.dietFlags.length ? item.dietFlags.join(", ") : "N/A"}
                  </Text>
                </SafeAreaView>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FridgeScreen;
