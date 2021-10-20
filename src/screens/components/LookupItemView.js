import React, { useState } from "react";

import {
  Text,
  Pressable,
  View,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { fetchFridgeItems } from "../../store/reducers/fridgeReducer";
import DatePicker from "react-native-neat-date-picker";

import NumericInput from "react-native-numeric-input";
import {
  removeAllLookupItems,
  addLookupItem,
} from "../../store/reducers/lookUpReducer";

import { useStorage } from "../../store/Context";

// Mabye add fresh item flied
export default LooupItemView = ({
  addedItems,
  setItemModalVisible,
  setAddedItems,
  setShowKeyboard,
}) => {
  const { dispatch, lookUpItem } = useStorage();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState();
  const [servings, setServings] = useState(1);

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const addtoFridge = async () => {
    setItemModalVisible(false);
    const itemData = {
      ...lookUpItem,
      expirationDate: dateObj,
      servings,
      storageType: "pantry",
    };

    setAddedItems([...addedItems, itemData]);
    await addLookupItem(itemData);
    fetchFridgeItems(dispatch);
    removeAllLookupItems(dispatch);
    setShowKeyboard(true);
  };

  const onConfirm = (date) => {
    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    setDateObj(date);
    setShowDatePicker(false);
  };

  return (
    <View>
      {console.log(lookUpItem, "jdslkdj")}
      {Object.keys(lookUpItem).length == 0 ? (
        <View>
          <Text style={{ textAlign: "center", fontSize: 18 }}>
            Sorry could not find Item
          </Text>
          <Pressable
            style={[styles.button]}
            onPress={() => {
              setItemModalVisible(false);
              setShowKeyboard(true);
            }}
          >
            <Text style={styles.textStyle}>GO BACK</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.imageStyle}
              source={{ uri: lookUpItem.image }}
            />
            <View style={styles.infoStyle}>
              <Text style={styles.titleStyle}>{lookUpItem.name}</Text>
              <Text style={styles.categoryStyle}>{lookUpItem.allergens}</Text>

              <View style={styles.numericInput}>
                <NumericInput
                  value={servings}
                  onChange={(value) => setServings(value)}
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  totalWidth={100}
                  totalHeight={30}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="black"
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="gray"
                  leftButtonBackgroundColor="lightgray"
                />
              </View>
              <View style={{ position: "absolute", left: 200, top: -50 }}>
                <Pressable style={[styles.button]} onPress={openDatePicker}>
                  <Text style={styles.textStyle}>Calender</Text>
                </Pressable>
                <DatePicker
                  isVisible={showDatePicker}
                  mode={"single"}
                  onCancel={onCancel}
                  onConfirm={onConfirm}
                />
                {/* <View>
              <Text>{JSON.stringify(dateObj)}</Text>
              {console.log(dateObj)}
            </View> */}
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Pressable
                style={[
                  styles.button,
                  { marginRight: 20, width: 100, backgroundColor: "darkred" },
                ]}
                onPress={() => {
                  setItemModalVisible(false);
                  setShowKeyboard(true);
                  removeAllLookupItems(dispatch);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, { width: 100 }]}
                onPress={() => addtoFridge()}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4C956C",
    height: 38,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
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
    // backgroundColor: "red",

    // shadowColor: "green",
    // shadowOffset: {
    //   width: 5,
    //   height: 5,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 5,
    borderBottomColor: "black",
    elevation: 9,
    // marginBottom: 20,
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
    // marginTop: 10,
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

  numericInput: {
    position: "absolute",
    left: 80,
    top: -50,
  },
});
