import styles from "./styles";
import React, { useState, useEffect } from "react";
import { Text, View, Button, Modal, Alert } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

import BarcodeLookUpModal from "./Modals/BarcodeLookUpModal";

import { useStorage } from "../../store/Context";
import { getFoodData } from "../../store/reducers/barcodeReducer";

export default function BarcodeScreen({ navigation }) {
  const { dispatch } = useStorage();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text] = useState("Scan Barcode");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const handleBarCodeScanned = async ({ data }) => {
    setLoading(true);
    // addFridgeItem();
    setScanned(true);
    await getFoodData(data, dispatch);
    setModalVisible(true);
    setLoading(false);
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
          setScanned={setScanned}
          navigation={navigation}
          loading={loading}
        />
      </Modal>

      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {/* {scanned && (
        <Button
          title={"Scan again?"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )} */}
    </View>
  );
}
