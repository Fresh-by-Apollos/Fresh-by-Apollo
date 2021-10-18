import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import styles from "../fridge-style";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Libaries
import { formatDistance } from "date-fns";
import NumericInput from "react-native-numeric-input";

// Context
import {
  fetchFridgeItems,
  updateFridgeItem,
} from "../../../store/reducers/fridgeReducer";
import { useStorage } from "../../../store/Context";

function FridgeItemView({ item, navigation }) {
  const { dispatch } = useStorage();
  const [showButtons, setShowButtons] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [servings, setServings] = useState(1);
  const [trashing, setTrashing] = useState(false);

  const handleAction = async (wasConsumed) => {
    let consumedAll = servings === item.servings || trashing;

    await updateFridgeItem(
      item.id,
      trashing ? item.servings : servings,
      consumedAll,
      {
        ...item,
        wasConsumed,
      }
    );

    setModalVisible(!modalVisible);
    setServings(1);
    setTrashing(false);
    await fetchFridgeItems(dispatch);
  };
  return (
    <>
      <TouchableOpacity
        style={styles.fridgeItems}
        onPress={() => {
          navigation.navigate("Selected Item", {
            name: item.name,
            expirationDate: item.expirationDate,
            servings: item.servings,
            allergens: item.allergens,
            dietFlags: item.dietFlags,
            protein: item.protein,
            carbs: item.carbs,
            fat: item.fat,
            imageUrl: item.imageUrl,
          });
        }}
      >
        <SafeAreaView style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
        </SafeAreaView>
        <SafeAreaView style={styles.otherData}>
          {/* capitalize first letter */}
          <View>
            <Text style={styles.itemNameText}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
            <TouchableOpacity
              style={showButtons && { display: "none" }}
              onPress={() => setShowButtons(true)}
            >
              <MaterialCommunityIcons
                style={styles.icon}
                name="dots-horizontal-circle-outline"
                size={32}
                color="darkgray"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={!showButtons && { display: "none" }}
              onPress={() => setShowButtons(false)}
            >
              <Ionicons
                style={styles.icon}
                name="md-arrow-back-circle-outline"
                size={32}
                color="darkgray"
              />
            </TouchableOpacity>

            <View
              style={
                !showButtons
                  ? { display: "none" }
                  : {
                      backgroundColor: "white",
                      position: "absolute",
                      left: 150,
                      top: 40,
                    }
              }
            >
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderStyle: "solid",
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginBottom: 2,
                }}
              >
                <Ionicons
                  style={{ marginRight: 6, marginBottom: 3 }}
                  name="fast-food-outline"
                  size={24}
                  color="green"
                />
                <Text>Consume</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setTrashing(true);
                }}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <FontAwesome
                  style={{ marginRight: 9 }}
                  name="trash-o"
                  size={24}
                  color="orange"
                />
                <Text>Throw out</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 42, width: 162 }}>
            <Text>Servings: {item.servings}</Text>
            <Text>
              Expires:{" "}
              {formatDistance(
                new Date(item.expirationDate.seconds * 1000),
                new Date(),
                { addSuffix: true }
              )}
            </Text>
            <Text style={styles.baseText}>
              Allergens:{" "}
              {item.allergens.length ? item.allergens.join(", ") : "N/A"}
            </Text>
            <Text style={styles.baseText}>
              Diet Flags:{" "}
              {item.dietFlags.length ? item.dietFlags.join(", ") : "N/A"}
            </Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={{ backgroundColor: "lightgray", borderRadius: 50 }}
            onPress={() => {
              setModalVisible(!modalVisible);
              setServings(1);
              setTrashing(false);
            }}
          >
            <AntDesign name="downcircleo" size={45} color="black" />
          </Pressable>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            {trashing ? (
              <View>
                <Text>Are you sure you want to trash this item?</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose1]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleAction(false)}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </View>
            ) : (
              <View>
                <NumericInput
                  value={servings}
                  onChange={(value) => setServings(value)}
                  maxValue={item.servings}
                  minValue={1}
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
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleAction(true)}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

export default FridgeItemView;
