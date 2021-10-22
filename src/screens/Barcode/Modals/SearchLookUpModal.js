import React, { useState } from 'react';
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
} from 'react-native';
import styles from '../lookUpModal-styles';
import { fetchFridgeItems } from '../../../store/reducers/fridgeReducer';
import { getLookupItem } from '../../../store/reducers/lookUpReducer';
import LookupItemView from '../../components/LookupItemView';
import { useStorage } from '../../../store/Context';
import { addLookupItem } from '../../../store/reducers/lookUpReducer';
import { removeAllLookupItems } from '../../../store/reducers/lookUpReducer';
import { MaterialIcons } from '@expo/vector-icons';

// Mabye add fresh item flied
export default SreachLookUpModal = ({ setModalVisible, navigation }) => {
  const { lookUpItem, dispatch } = useStorage();
  const [dateObj, setDateObj] = useState();
  const [itemInput, setItemInput] = useState('');
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
    if (!itemInput) {
      alert('Please enter an item to search');
    } else {
      setShowKeyboard(false);
      getLookupItem(itemInput, dispatch);
      setItemModalVisible(true);
    }
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
      storageType: 'pantry',
    };

    await addLookupItem(itemData);
    fetchFridgeItems(dispatch);
    removelookUpItem(dispatch);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <SafeAreaView style={styles.headerContainer}>
          <Pressable
            style={{ marginLeft: '3%' }}
            onPress={() => {
              setModalVisible(false);
              addLookupItems();
            }}
          >
            <MaterialIcons name="cancel" size={24} color="white" />
          </Pressable>
          <Text style={styles.titleText}>Manual Lookup</Text>
          <View></View>
        </SafeAreaView>
        <DismissKeyboard>
          <SafeAreaView style={{ width: '100%', height: 600 }}>
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
                  sreachItem();
                  setItemInput('');
                }}
              >
                <Text style={styles.textStyle}>Search</Text>
              </Pressable>
            </SafeAreaView>
            <SafeAreaView style={styles.scrollViewContainer}>
              <View style={styles.scrollHeaderContainer}>
                <Text style={styles.scrollViewheader}>Recently Added</Text>
              </View>
              <View style={{ height: 460, width: '100%' }}>
                <ScrollView contentContainerStyle={styles.listOfItemsContainer}>
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
        </DismissKeyboard>
        <Modal
          animationType="slide"
          transparent={true}
          visible={itemModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
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
              />
            </View>
          </View>
        </Modal>
        <View style={{ position: 'absolute', top: 500 }}></View>
      </View>
    </View>
  );
};
