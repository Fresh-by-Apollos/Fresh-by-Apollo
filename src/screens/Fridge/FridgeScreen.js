import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useStorage } from "../../store/Context";
import { fetchFridgeItems } from "../../store/reducers/fridgeReducer";
import styles from "./fridge-style";
import FridgeItemView from "./components/FridgeItemView";

function FridgeScreen({ navigation }) {
  const { fridgeState, dispatch } = useStorage();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchFridgeItems(dispatch);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SafeAreaView style={styles.statsIcon}>
          <MaterialCommunityIcons
            style={styles.statsArrowIcon}
            name="menu-left"
            size={32}
            color="darkgray"
            onPress={() => navigation.navigate("StatisticsScreen")}
          />
          <MaterialCommunityIcons
            style={styles.statsIcon}
            name="chart-pie"
            size={32}
            color="darkgray"
            onPress={() => navigation.navigate("StatisticsScreen")}
          />
        </SafeAreaView>
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
