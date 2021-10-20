import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useStorage } from "../../store/Context";
import InfoScreen from "./Modals/BarcodeLookUpModal";
import { AntDesign } from "@expo/vector-icons";

import {
  addFridgeItem,
  getFoodData,
} from "../../store/reducers/barcodeReducer";

//  070662035016  <-- Ramen Noodles Barcode:
export default function BarcodeScreen({ navigation }) {
  const { dispatch, scannedItem } = useStorage();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [modalVisible, setModalVisible] = useState(false);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // useEffect(() => {
  //   console.log(scannedItem);
  // }, [scannedItem]);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ data }) => {
    // addFridgeItem();
    setScanned(true);
    getFoodData(data, dispatch);
    // console.log(scannedItem);
    // navigation.navigate("BarcodeInfoScreen");
    setModalVisible(true);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }
  // Return the View
  return (
    <View style={modalVisible ? styles.container1 : styles.container}>
      {/* <TestingScreen /> */}
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
        <InfoScreen setModalVisible={setModalVisible} navigation={navigation} />
      </Modal>

      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && (
        <Button
          title={"Scan again?"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}

      {/* <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => navigation.navigate("Calender")}
      >
        <Text style={styles.textStyle}>Calender</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    backgroundColor: "gray",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
