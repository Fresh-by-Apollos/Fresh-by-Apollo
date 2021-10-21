import React, { useState } from 'react';
import { Text, Pressable, View, Button, Image } from 'react-native';
import { fetchFridgeItems } from '../../../store/reducers/fridgeReducer';
import DatePicker from 'react-native-neat-date-picker';
import {
  addFridgeItem,
  removeScannedItem,
} from '../../../store/reducers/barcodeReducer';
import NumericInput from 'react-native-numeric-input';
import { formatDistance } from 'date-fns';
import styles from '../scanModal-styles';
import { useStorage } from '../../../store/Context';

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default BarcodeLookUpModal = ({
  setScanned,
  setModalVisible,
  navigation,
}) => {
  const { scannedItem, dispatch } = useStorage();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(null);
  const [servings, setServings] = useState(1);

  console.log(dateObj);

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
    if (dateObj) {
      setModalVisible(false);
      setScanned(false);
      const itemData = {
        ...scannedItem,
        expirationDate: dateObj,
        servings,
        storageType: 'pantry',
      };
      await addFridgeItem(itemData);
      fetchFridgeItems(dispatch);
      removeScannedItem(dispatch);
    } else {
      alert('Please input an expiration date');
    }
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
          <Pressable
            style={{ marginLeft: '3%' }}
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
          iconStyle={{ color: 'white' }}
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
            mode={'single'}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
          <View style={styles.expirationContainer}>
            {dateObj ? (
              <Text style={styles.expirationText}>
                Expires{' '}
                {dateObj
                  ? formatDistance(new Date(dateObj), new Date(), {
                      addSuffix: true,
                    })
                  : ''}
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
      </View>
    </View>
  );
};
