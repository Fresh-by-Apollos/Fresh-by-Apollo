import React, { useState, useEffect } from "react";
import {
  Text,
  Pressable,
  View,
  Button,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";
import { fetchFridgeItems } from "../../../store/reducers/fridgeReducer";
import DatePicker from "react-native-neat-date-picker";
import {
  addFridgeItem,
  removeScannedItem,
} from "../../../store/reducers/barcodeReducer";
import NumericInput from "react-native-numeric-input";
import styles from "../infoScreen-styles";
import { useStorage } from "../../../store/Context";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import DietWarningsModal from "./DietWarningsModal";

export default BarcodeLookUpModal = ({ setModalVisible, navigation }) => {
  const { scannedItem, dispatch, userState } = useStorage();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState();
  const [servings, setServings] = useState(1);
  const [flagModalVisible, setFlagModalVisible] = useState(false);
  const [dietRestrictWarnings, setDietRestrictWarnings] = useState({
    dietLabels: [],
    dietFlags: [],
  });

  const { dietFlags, dietLabels } = scannedItem;

  useEffect(() => {
    checkScannedItem();
  }, []);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  // .
  const onCancel = () => {
    setShowDatePicker(false);
  };

  const addtoFridge = async () => {
    setModalVisible(false);
    const itemData = {
      ...scannedItem,
      expirationDate: dateObj,
      servings,
      storageType: "pantry",
    };
    await addFridgeItem(itemData);
    fetchFridgeItems(dispatch);
    removeScannedItem(dispatch);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setDateObj(date);
  };

  const checkScannedItem = () => {
    if (dietLabels) {
      const dietRestrictions = userState.dietRestrictions.filter(
        (restriction) => !dietLabels.includes(restriction)
      );
      const flags = dietFlags.map((v) => v.toLowerCase());
      const diet_Flags = userState.allergies.filter((allergen) =>
        flags.includes(allergen.toLowerCase())
      );

      if (dietRestrictions.length > 0 || diet_Flags.length > 0) {
        setDietRestrictWarnings({
          dietFlags: diet_Flags,
          dietLabels: dietRestrictions,
        });
        setFlagModalVisible(true);
      }
    }

    // if yo.length > 0: setConflict(yo)
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {!Object.keys(scannedItem).length > 0 ? (
          <>
            <View
              style={{
                backgroundColor: "#D54C4C",
                ...styles.modalHeader,
              }}
              onPress={() => setModalVisible(false)}
            >
              <View style={{ marginLeft: "3%" }}>
                <MaterialIcons name="cancel" size={24} color="white" />
              </View>
              <Text style={styles.headerText}>Opps ..</Text>
              <View></View>
            </View>

            <SafeAreaView>
              <Text
                style={
                  (styles.modalDetail,
                  {
                    fontSize: 24,
                    fontWeight: "bold",
                    margin: 30,
                    marginBottom: 50,
                  })
                }
              >
                {`Sorry, could not find item`}
              </Text>
            </SafeAreaView>

            <SafeAreaView style={styles.throwOutBtnContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose1, { flex: 1 }]}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Go back</Text>
              </Pressable>
            </SafeAreaView>
          </>
        ) : (
          <>
            <View style={styles.headerContainer}>
              <View style={{ marginLeft: "3%" }}>
                <MaterialIcons
                  onPress={() => setModalVisible(false)}
                  name="cancel"
                  size={24}
                  color="white"
                />
              </View>
              <Text style={styles.headerText}>Add Item</Text>
              <View></View>
            </View>
            <View style={styles.container}>
              <View style={styles.cardContainer}>
                <Image
                  style={styles.imageStyle}
                  source={{ uri: scannedItem.imageUrl }}
                />
                <View style={styles.infoStyle}>
                  <Text style={styles.infoTitle}>{scannedItem.name}</Text>
                  <Text style={styles.categoryStyle}>
                    {scannedItem.allergens}
                  </Text>
                </View>
              </View>
            </View>

            <NumericInput
              value={servings}
              onChange={(value) => setServings(value)}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={120}
              totalHeight={35}
              iconSize={25}
              step={1}
              valueType="real"
              rounded
              textColor="black"
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor="gray"
              leftButtonBackgroundColor="lightgray"
            />
            <View style={styles.expireContainer}>
              <Pressable
                style={[styles.expirationBtn, styles.buttonClose]}
                onPress={openDatePicker}
              >
                <Text style={styles.textStyle}>Expiration Date </Text>
                <FontAwesome5 name="calendar" size={24} color="white" />
              </Pressable>
              <DatePicker
                isVisible={showDatePicker}
                mode={"single"}
                onCancel={onCancel}
                onConfirm={onConfirm}
              />
              <View>
                <Text>{JSON.stringify(dateObj)}</Text>
              </View>
            </View>

            <View>
              <Pressable
                style={[styles.button, styles.buttonClose, { height: 50 }]}
                onPress={addtoFridge}
              >
                <Text style={styles.textStyle}>Add to Fridge</Text>
              </Pressable>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={flagModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setFlagModalVisible(!flagModalVisible);
              }}
            >
              <DietWarningsModal
                flagModalVisible={flagModalVisible}
                setFlagModalVisible={setFlagModalVisible}
                dietRestrictWarnings={dietRestrictWarnings}
                setModalVisible={setModalVisible}
              />
            </Modal>
          </>
        )}
      </View>
    </View>
  );
};
