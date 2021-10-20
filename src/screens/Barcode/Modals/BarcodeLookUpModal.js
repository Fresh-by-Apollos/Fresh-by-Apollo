import React, { useState } from "react";
import { Text, Pressable, View, Button, Image } from "react-native";
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

export default BarcodeLookUpModal = ({ setModalVisible, navigation }) => {
  const { scannedItem, dispatch } = useStorage();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState();
  const [servings, setServings] = useState(1);

  const handleChange = ({ target }) => {
    setServings(target.value);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  // .
  const onCancel = () => {
    // You should close the modal in here
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
    // You should close the modal in here
    setShowDatePicker(false);

    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    setDateObj(date);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.headerContainer}>
          <View style={{ marginLeft: "3%" }}>
            <MaterialIcons name="cancel" size={24} color="white" />
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
              <Text style={styles.categoryStyle}>{scannedItem.allergens}</Text>
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
            style={[styles.button, styles.buttonClose]}
            onPress={addtoFridge}
          >
            <Text style={styles.textStyle}>Add to Fridge</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
