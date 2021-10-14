import React, { useState } from "react";
import {
  Text,
  Pressable,
  View,
  Button,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { fetchFridgeItems } from "../../store/reducers/fridgeReducer";
import DatePicker from "react-native-neat-date-picker";
import {
  addFridgeItem,
  removeScannedItem,
} from "../../store/reducers/barcodeReducer";
import NumericInput from "react-native-numeric-input";

import { useStorage } from "../../store/Context";

export default InfoScreen = ({ setModalVisible }) => {
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
    const stuff = { ...scannedItem, expirationDate: dateObj, servings };
    await addFridgeItem(stuff);
    fetchFridgeItems(dispatch);
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
        {/* <Text style={styles.modalText}>Hello World!</Text> */}
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.imageStyle}
              source={{ uri: scannedItem.imageUrl }}
            />
            <View style={styles.infoStyle}>
              <Text style={styles.titleStyle}>{scannedItem.name}</Text>
              <Text style={styles.categoryStyle}>{scannedItem.allergens}</Text>

              <View style={styles.iconLabelStyle}>
                {/* <IconLabel name="ios-time" label={deliveryTime} color={"blue"} /> */}
                {/* <IconLabel name="ios-pin" label={distance} color={iconColor} /> */}
              </View>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            removeScannedItem(dispatch);
            setModalVisible(false);
          }}
        >
          <Text style={styles.textStyle}>Go Back</Text>
        </Pressable>

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
        <View style={{ marginTop: 40 }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={openDatePicker}
          >
            <Text style={styles.textStyle}>Calender</Text>
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

        <View style={{ marginTop: 40 }}>
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
  modalView: {
    width: deviceWidth,
    height: 550,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4C956C",
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
    // borderRadius: radius,

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
});
