import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

// This refers to the function defined earlier in this guide, in Push Notifications Set Up
// import { registerForPushNotificationsAsync } from "../LoginScreen/SignUpScreen";

import firebase from "../../firebase/firebase";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./fridge-style";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Libraries
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

// Context
import { useStorage } from "../../store/Context";
import { fetchFridgeItems } from "../../store/reducers/fridgeReducer";

// Components
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

  useEffect(() => {
    fetchFridgeItems(dispatch);
    registerForPushNotificationsAsync();
  }, []);

  //request permission to send Push Notifications
  const registerForPushNotificationsAsync = async () => {
    console.log("entered registerForPushNotificationsAynsc");
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      console.log("existingStatus:", existingStatus);
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("token:", token);
      console.log(
        "firebase.auth().currentUser.uid",
        firebase.auth().currentUser.uid
      );
      const userId = firebase.auth().currentUser.uid;
      const userRef = firebase.firestore().collection("users");
      const user = userRef.doc(userId);
      await user.update({ expoPushToken: token }).catch((error) => {
        alert(error);
      });
      const updatedUserRef = firebase.firestore().collection("users");
      console.log("Set Expo Notification Token successfully");
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

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
                  `${item.id}` +
                  new Date(
                    item.expirationDate.seconds * 1000
                  ).toLocaleDateString("en-US")
                }
                itemInfo={item}
                navigation={navigation}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FridgeScreen;
