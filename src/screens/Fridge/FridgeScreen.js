<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
=======
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
>>>>>>> main

import { Ionicons } from "@expo/vector-icons";

import * as Notifications from "expo-notifications";

// This refers to the function defined earlier in this guide, in Push Notifications Set Up
// import { registerForPushNotificationsAsync } from "../LoginScreen/SignUpScreen";

import Constants from "expo-constants";
import firebase from "../../firebase/firebase";


import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useStorage } from '../../store/Context';
import { fetchFridgeItems } from '../../store/reducers/fridgeReducer';
import styles from './fridge-style';
import FridgeItemView from './components/FridgeItemView';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function FridgeScreen({ navigation }) {
  const { fridgeState, dispatch } = useStorage();
  const [notification, setNotification] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

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
      const user = userRef.doc(userId)
      await user.update({expoPushToken: token })
        .catch((error) => {
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
            onPress={() => navigation.navigate('StatisticsScreen')}
          />
          <MaterialCommunityIcons
            style={styles.statsIcon}
            name="chart-pie"
            size={32}
            color="darkgray"
            onPress={() => navigation.navigate('StatisticsScreen')}
          />
        </SafeAreaView>
        {fridgeState.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('BarcodeScreen')}
            >
              <Ionicons name="md-add-circle-outline" size={50} color="green" />
            </TouchableOpacity>
            <Text style={{ fontSize: 25 }}>ADD TO FRIDGE</Text>
          </View>
        ) : (
          <View style={styles.notEmpty}>
            {/* {console.log(fridgeState)} */}
            {fridgeState.map((item) => (
              <FridgeItemView
                key={
                  `${item.barcode}` +
                  new Date(
                    item.expirationDate.seconds * 1000
                  ).toLocaleDateString('en-US')
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
