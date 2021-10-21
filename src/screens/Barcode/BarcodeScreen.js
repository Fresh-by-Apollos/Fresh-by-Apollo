import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Modal, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useStorage } from "../../store/Context";

import BarcodeLookUpModal from "./Modals/BarcodeLookUpModal";
import styles from "./styles";

import {
  addFridgeItem,
  getFoodData,
} from "../../store/reducers/barcodeReducer";

//  070662035016  <-- Ramen Noodles Barcode:
export default function BarcodeScreen({ navigation }) {
  const { dispatch, scannedItem } = useStorage();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Scan Barcode");
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
    setScanned(false);
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ data }) => {
    // addFridgeItem();
    setScanned(true);
    getFoodData(data, dispatch);
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
        <BarcodeLookUpModal
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
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
    </View>
  );
}
