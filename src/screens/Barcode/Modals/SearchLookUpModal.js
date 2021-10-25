import {
  Text,
  Pressable,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import styles from "../lookUpModal-styles";

// icons
import { MaterialIcons } from "@expo/vector-icons";

// Components
import LookupItemView from "../../components/LookupItemView";

// Context
import { useStorage } from "../../../store/Context";
import { getLookupItem } from "../../../store/reducers/lookUpReducer";
import { removeAllLookupItems } from "../../../store/reducers/lookUpReducer";

export default searchLookUpModal = ({ setModalVisible, navigation }) => {
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [addedItems, setAddedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemInput, setItemInput] = useState("");
  const { dispatch } = useStorage();

  const searchItem = async () => {
    if (!itemInput) {
      alert("Please enter an item to search");
    } else {
      setLoading(true);
      setShowKeyboard(false);
      setItemModalVisible(true);
      await getLookupItem(itemInput, dispatch);
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SafeAreaView style={styles.headerContainer}>
              <Pressable
                style={{ marginLeft: "3%" }}
                onPress={() => {
                  setModalVisible(false);
                  removeAllLookupItems(dispatch);
                }}
              >
                <MaterialIcons name="cancel" size={24} color="white" />
              </Pressable>
              <Text style={styles.titleText}>Manual Lookup</Text>
              <View></View>
            </SafeAreaView>

            <SafeAreaView style={{ width: "100%", height: 600 }}>
              <SafeAreaView style={styles.container2}>
                <TextInput
                  style={styles.inputStyle}
                  autoFocus={showKeyboard}
                  clearButtonMode="always"
                  placeholder="Ex: Apple..."
                  value={itemInput}
                  onChangeText={setItemInput}
                  autoCapitalize="words"
                  keyboardType="default"
                  autoCompleteType="name"
                  textContentType="name"
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    searchItem();
                    setItemInput("");
                  }}
                >
                  <Text style={styles.textStyle}>Search</Text>
                </Pressable>
              </SafeAreaView>
              <SafeAreaView style={styles.scrollViewContainer}>
                <View style={styles.scrollHeaderContainer}>
                  <Text style={styles.scrollViewheader}>Recently Added</Text>
                </View>
                <View style={{ height: 460, width: "100%" }}>
                  <ScrollView
                    contentContainerStyle={styles.listOfItemsContainer}
                  >
                    {addedItems.map((lookUpItem) => (
                      <View
                        key={Math.random() * (1000 - 1) + 1}
                        style={styles.container}
                      >
                        <View style={styles.cardContainer}>
                          <Image
                            style={styles.imageStyle}
                            source={{ uri: lookUpItem.image }}
                          />
                          <Text style={styles.captionText}>
                            {lookUpItem.name}
                          </Text>
                          <Text>{lookUpItem.servings}</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </SafeAreaView>
            </SafeAreaView>

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
                  <LookupItemView
                    setAddedItems={setAddedItems}
                    setItemModalVisible={setItemModalVisible}
                    addedItems={addedItems}
                    setShowKeyboard={setShowKeyboard}
                    loading={loading}
                  />
                </View>
              </View>
            </Modal>
            <View style={{ position: "absolute", top: 500 }}></View>
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};
