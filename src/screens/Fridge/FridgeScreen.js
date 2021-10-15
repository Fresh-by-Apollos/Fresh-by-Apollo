import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { useStorage } from "../../store/Context";
import { fetchFridgeItems } from "../../store/reducers/fridgeReducer";
import styles from "./fridge-style";
import { formatDistance } from "date-fns";
import FridgeItemView from "./components/FridgeItemView";

function FridgeScreen({ navigation }) {
  const { fridgeState, dispatch } = useStorage();
  const [showButtons, setShowButtons] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("infinite loop?");
    fetchFridgeItems(dispatch);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>My Fridge</Text> */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {fridgeState.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("BarcodeScreen")}
            >
              <Ionicons name="md-add-circle-outline" size={50} color="green" />
            </TouchableOpacity>
            <Text style={{ fontSize: 25 }}>ADD TO FRIDGE</Text>
          </View>
        ) : (
          <View style={styles.notEmpty}>
            {console.log(fridgeState)}
            {fridgeState.map((item) => (
              <FridgeItemView
                key={
                  `${item.barcode}` +
                  new Date(
                    item.expirationDate.seconds * 1000
                  ).toLocaleDateString("en-US")
                }
                item={item}
                navigation={navigation}
                setModalVisible={setModalVisible}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FridgeScreen;
