import React, { useState } from 'react';

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
} from 'react-native';

import { fetchFridgeItems } from '../../store/reducers/fridgeReducer';
import DatePicker from 'react-native-neat-date-picker';

import NumericInput from 'react-native-numeric-input';
import {
  removeAllLookupItems,
  addLookupItem,
} from '../../store/reducers/lookUpReducer';
import styles from './lookUpResult-styles';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { useStorage } from '../../store/Context';

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
      storageType: 'pantry',
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
    <View style={styles.container}>
      {Object.keys(lookUpItem).length == 0 ? (
        <View style={styles.notFoundContainer}>
          <View style={styles.errorContainer}>
            <MaterialIcons name="error" size={30} color="#D54C4C" />
            <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: '3%' }}>
              Item not Found
            </Text>
          </View>
          <Pressable
            style={[styles.secondaryButton]}
            onPress={() => {
              setItemModalVisible(false);
              setShowKeyboard(true);
            }}
          >
            <Text style={styles.textStyle}>GO BACK</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <View style={styles.itemDetailContainer}>
            <Image
              style={styles.imageStyle}
              source={{ uri: lookUpItem.image }}
            />
            <Text style={styles.itemName}>{lookUpItem.name}</Text>
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
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor="gray"
              leftButtonBackgroundColor="lightgray"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.calendarBtn} onPress={openDatePicker}>
              <FontAwesome5 name="calendar" size={24} color="white" />
            </Pressable>
            <DatePicker
              isVisible={showDatePicker}
              mode={'single'}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
            <View>
              <Text>Text</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button]}
              onPress={() => {
                setItemModalVisible(false);
                setShowKeyboard(true);
                removeAllLookupItems(dispatch);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.button]} onPress={() => addtoFridge()}>
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};
