import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  Pressable,
  View,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
} from "react-native";
import { fetchFridgeItems } from "../../../store/reducers/fridgeReducer";
import DatePicker from "react-native-neat-date-picker";
import {
  addFridgeItem,
  removeScannedItem,
} from "../../../store/reducers/barcodeReducer";
import NumericInput from "react-native-numeric-input";
import { getLookupItem } from "../../../store/reducers/lookUpReducer";
import LookupItemView from "../../components/LookupItemView";
import { useStorage } from "../../../store/Context";
import { addLookupItem } from "../../../store/reducers/lookUpReducer";
import { removeAllLookupItems } from "../../../store/reducers/lookUpReducer";

// Mabye add fresh item flied
export default SreachLookUpModal = ({ setModalVisible, navigation }) => {
  const { lookUpItem, dispatch } = useStorage();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState();
  const [itemInput, setItemInput] = useState("");
  const [servings, setServings] = useState(1);
  const [sreachedItems, setSreachedItems] = useState([]);

  const [addedItems, setAddedItems] = useState([]);
  const [showKeyboard, setShowKeyboard] = useState(true);

  const [itemModalVisible, setItemModalVisible] = useState(false);

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const sreachItem = async () => {
    setShowKeyboard(false);

    getLookupItem(itemInput, dispatch);
    setItemModalVisible(true);
  };

  const addLookupItems = async () => {
    removeAllLookupItems(dispatch);
  };

  const addtoFridge = async () => {
    setModalVisible(false);
    const itemData = {
      ...sreachedItems[0],
      expirationDate: dateObj,
      servings,
      storageType: "pantry",
    };

    await addLookupItem(itemData);
    fetchFridgeItems(dispatch);
    removelookUpItem(dispatch);
  };

  return (
    <View style={styles.centeredView}>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          setModalVisible(false);
          addLookupItems();
        }}
      >
        <Text style={styles.textStyle}>FINISH</Text>
      </Pressable>
      <View style={styles.modalView}>
        <SafeAreaView style={styles.titleContainer}>
          <Text style={styles.titleText}>FRESH</Text>
        </SafeAreaView>
        <DismissKeyboard>
          <SafeAreaView style={{ width: "100%", height: "100%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "gray",
                textAlign: "center",
              }}
            >
              Sreach for an Item
            </Text>
            <SafeAreaView style={styles.container2}>
              <View>
                <SafeAreaView style={styles.loginFormContainer}>
                  {/* <SafeAreaView style={styles.titleContainer}>
                    <Text style={styles.titleText}>FRESH</Text>
                  </SafeAreaView> */}
                  <TextInput
                    style={styles.inputStyle}
                    autoFocus={showKeyboard}
                    clearButtonMode="always"
                    placeholder="Ex: Apple..."
                    value={itemInput}
                    onChangeText={setItemInput}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                  />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      sreachItem();
                      setItemInput("");
                    }}
                  >
                    <Text style={styles.textStyle}>SREACH</Text>
                  </Pressable>
                </SafeAreaView>
              </View>
            </SafeAreaView>
          </SafeAreaView>
        </DismissKeyboard>
        <ScrollView style={{ position: "absolute", top: 145, left: 28 }}>
          {addedItems.map((lookUpItem) => (
            <View key={Math.random() * (1000 - 1) + 1} style={styles.container}>
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 20,
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                ITEMS ADDED
              </Text>
              <View style={styles.cardContainer}>
                <Image
                  style={styles.imageStyle}
                  source={{ uri: lookUpItem.image }}
                />
                <View style={styles.infoStyle}>
                  <Text style={styles.titleStyle}>{lookUpItem.name}</Text>
                  <Text style={styles.categoryStyle}>
                    {lookUpItem.allergens}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={itemModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setItemModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              {/* <Text style={styles.modalText}>Hello World!</Text> */}
              {/* <Text> {JSON.stringify(lookUpItem)} </Text> */}
              <LookupItemView
                setAddedItems={setAddedItems}
                setItemModalVisible={setItemModalVisible}
                addedItems={addedItems}
                setShowKeyboard={setShowKeyboard}
              />
            </View>
          </View>
        </Modal>
        <View style={{ position: "absolute", top: 500 }}></View>
      </View>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  centeredView1: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 400,
  },
  modalView: {
    width: deviceWidth,
    height: 700,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView1: {
    width: deviceWidth,
    height: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4C956C",
    height: 38,
  },
  buttonOpen: {
    backgroundColor: "#4C956C",
  },
  buttonClose: {
    backgroundColor: "#4C956C",
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

  // ---------------->>>
  container: {
    width: deviceWidth - 20,
    alignItems: "center",
    marginTop: 0,
    // display: "flex",
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: "white",
    height: 110,
    borderRadius: 10,

    shadowColor: "green",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderBottomColor: "black",
    elevation: 9,
    marginBottom: 20,
  },
  imageStyle: {
    height: 90,
    width: 40,
    // borderTopLeftRadius: radius,
    // borderTopRightRadius: radius,
    opacity: 0.9,
    // alignContent: "center",
    // alignSelf: "center",
    marginLeft: 30,
    marginTop: 10,
    resizeMode: "stretch",
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "800",
    position: "absolute",
    left: 80,
    top: -85,
  },
  categoryStyle: {
    fontWeight: "200",
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: "row",
    marginTop: 10,
  },

  //   ----------------------
  container2: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "space-between",
    // flexDirection: "column",
    height: 220,
    // width: "100%",
  },
  titleContainer: {
    marginRight: 10,
  },
  titleText: {
    fontSize: 15,
    // margin: 10,
    fontWeight: "bold",
    color: "#4C956C",
  },
  captionText: {
    fontSize: 17,
  },
  loginFormContainer: {
    flex: 2,
    // alignItems: "center",

    // justifyContent: "space-evenly",
    // marginBottom: "70%",
    flexDirection: "row",
  },
  signupFormContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "space-evenly",
    // marginBottom: "25%",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4C956C",
  },
  inputStyle: {
    height: 40,
    width: 230,
    padding: 10,
    textAlign: "left",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 15,
  },
  loginButton: {
    flex: 0.15,
    // justifyContent: "center",
    // alignItems: "center",
    width: 300,
    height: "20%",
    backgroundColor: "#4C956C",
    borderRadius: 20,
  },
  signupButton: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: "20%",
    backgroundColor: "#4C956C",
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  numericInput: {
    position: "absolute",
    left: 40,
    top: 299,
  },
});
