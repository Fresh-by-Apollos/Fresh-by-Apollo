import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";

import * as Notifications from "expo-notifications";

// This refers to the function defined earlier in this guide, in Push Notifications Set Up
import { registerForPushNotificationsAsync } from "../LoginScreen/SignUpScreen";

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function FridgeScreen({ navigation }) {
  const { fridgeState, dispatch } = useStorage();
  const [ notification, setNotification ] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("infinite loop?");
    fetchFridgeItems(dispatch);
    Notifications.addNotificationReceivedListener(_handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      _handleNotificationResponse
    );
  }, []);

  _handleNotification = (notification) => {
    setNotification({ notification: notification });
  };

  _handleNotificationResponse = (response) => {
    console.log(response);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
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
