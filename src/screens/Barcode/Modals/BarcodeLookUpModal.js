import {
  Text,
  Pressable,
  View,
  Image,
  SafeAreaView,
  Modal,
} from "react-native";
import styles from "../scanModal-styles";
import React, { useState, useEffect } from "react";

// Icons
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Libaries
import { formatDistance } from "date-fns";
import NumericInput from "react-native-numeric-input";
import DatePicker from "react-native-neat-date-picker";

// Modals
import DietWarningsModal from "./DietWarningsModal";

// Context
import {
  addFridgeItem,
  removeScannedItem,
} from "../../../store/reducers/barcodeReducer";
import { useStorage } from "../../../store/Context";
import { fetchFridgeItems } from "../../../store/reducers/fridgeReducer";

export default BarcodeLookUpModal = ({ setScanned, setModalVisible }) => {
  const { scannedItem, dispatch, userState } = useStorage();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(null);
  const [servings, setServings] = useState(1);

  const [flagModalVisible, setFlagModalVisible] = useState(false);
  const { dietFlags, dietLabels } = scannedItem;
  const [dietRestrictWarnings, setDietRestrictWarnings] = useState({
    dietLabels: [],
    dietFlags: [],
  });

  useEffect(() => {
    checkScannedItem();
  }, []);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setScanned(false);
    setShowDatePicker(false);
  };

  const addtoFridge = async () => {
    if (dateObj) {
      setModalVisible(false);
      setScanned(false);
      const itemData = {
        ...scannedItem,
        expirationDate: dateObj,
        servings,
        storageType: "pantry",
      };
      await addFridgeItem(itemData);
      fetchFridgeItems(dispatch);
      removeScannedItem(dispatch);
    } else {
      alert("Please input an expiration date");
    }
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
            >
              <Pressable
                onPress={() => {
                  {
                    setModalVisible(false);
                    setScanned(false);
                  }
                }}
                style={{ marginLeft: "3%" }}
              >
                <MaterialIcons name="cancel" size={24} color="white" />
              </Pressable>
              <Text style={styles.headerText}>Oops ..</Text>
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
                style={[styles.button3, styles.buttonClose1, { flex: 1 }]}
                onPress={() => {
                  {
                    setModalVisible(false);
                    setScanned(false);
                  }
                }}
              >
                <Text style={styles.textStyle}>Go back</Text>
              </Pressable>
            </SafeAreaView>
          </>
        ) : (
          <>
            <View style={styles.headerContainer}>
              <Pressable
                style={{ marginLeft: "3%" }}
                onPress={() => {
                  setModalVisible(false);
                  setScanned(false);
                }}
              >
                <MaterialIcons name="cancel" size={24} color="white" />
              </Pressable>
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
                <FontAwesome5 name="calendar" size={24} color="white" />
              </Pressable>
              <DatePicker
                isVisible={showDatePicker}
                mode={"single"}
                onCancel={onCancel}
                onConfirm={onConfirm}
              />
              <View style={styles.expirationContainer}>
                {dateObj ? (
                  <Text style={styles.expirationText}>
                    Expires{" "}
                    {formatDistance(new Date(dateObj), new Date(), {
                      addSuffix: true,
                    })}
                  </Text>
                ) : (
                  <Text>Enter Expiration Date</Text>
                )}
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
          </>
        )}
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
      </View>
    </View>
  );
};
