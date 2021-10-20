import * as React from "react";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, Pressable, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// Screens
import BarcodeScreen from "./BarcodeScreen";
import InfoScreen from "./Modals/BarcodeLookUpModal";
import BarcodeLookUpModal from "./Modals/BarcodeLookUpModal";
import Calender from "./Calender";
import SreachLookUpModal from "./Modals/SreachLookUpModal";

const BarcodeStack = createNativeStackNavigator();

export default function BarcodeNav({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <BarcodeStack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#2C6E49",
          },
          headerTitle: "ADD TO FRIDGE",
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 25,
          },
        }}
      >
        <BarcodeStack.Screen
          options={{
            headerRight: () => (
              <Pressable onPress={(props) => setModalVisible(true)}>
                <AntDesign name="plus" size={30} color="white" />
              </Pressable>
            ),
          }}
          name="BarcodeScreen"
          component={BarcodeScreen}
        />
        <BarcodeStack.Screen
          name="BarcodeInfoScreen"
          component={BarcodeLookUpModal}
        />
        <BarcodeStack.Screen name="Calender" component={Calender} />
      </BarcodeStack.Navigator>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        {/* <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Text> {JSON.stringify(scannedItem)} </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View> */}
        <SreachLookUpModal
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
      </Modal>
    </>
  );
}
