import { Text, Pressable, View, Image, SafeAreaView } from 'react-native';
import styles from '../../Barcode/scanModal-styles';
import React, { useState } from 'react';

// Icons
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// Libraries
import { formatDistance } from 'date-fns';
import NumericInput from 'react-native-numeric-input';
import DatePicker from 'react-native-neat-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';

// Context
import {
  editFridgeItem,
  fetchFridgeItems,
} from '../../../store/reducers/fridgeReducer';
import { useStorage } from '../../../store/Context';

export default SingleItemEditModal = ({ item, setModalVisible }) => {
  const { dispatch } = useStorage();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(null);
  const [servings, setServings] = useState(item.servings);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.storage);
  const [items, setItems] = useState([
    { label: 'Fridge', value: 'fridge' },
    { label: 'Freezer', value: 'freezer' },
    { label: 'Pantry', value: 'pantry' },
  ]);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const editItem = async () => {
    setModalVisible(false);
    await editFridgeItem(
      item.id,
      servings,
      dateObj ? dateObj : item.expirationDate,
      value ? value : item.storage
    );
    await fetchFridgeItems(dispatch);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setDateObj(date);
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <View style={styles.modalView}>
        <>
          <View style={styles.headerContainer2}>
            <Pressable
              style={{ marginLeft: '3%' }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <MaterialIcons name="cancel" size={24} color="white" />
            </Pressable>
            <Text style={styles.headerText}>Edit Item</Text>
            <View></View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.cardContainer}>
              <Image
                style={styles.imageStyle}
                source={{ uri: item.imageUrl }}
              />
              <View style={styles.infoStyle}>
                <Text style={styles.infoTitle}>{item.name}</Text>
                <Text style={styles.categoryStyle}>{item.allergens}</Text>
              </View>
            </View>
          </View>
          <SafeAreaView style={styles.servingsContainer}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>Servings</Text>
            <NumericInput
              value={servings}
              onChange={(value) => setServings(value)}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={100}
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
          </SafeAreaView>

          <DropDownPicker
            open={open}
            value={value}
            zIndex={1000}
            items={items}
            setOpen={setOpen}
            style={{ height: 35 }}
            containerStyle={{ width: '35%', top: 20 }}
            setValue={setValue}
            setItems={setItems}
            // defaultValue={value}
            textStyle={{ textAlign: 'left', paddingLeft: '20%' }}

            // placeholder="Storage Type"
            // placeholderStyle={{ textAlign: "center" }}
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
                  {formatDistance(new Date(dateObj), new Date(), {
                    addSuffix: true,
                  })}
                </Text>
              ) : (
                <Text>Enter Expiration Date</Text>
              )}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose1, { width: 100 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}> Cancel </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose, { width: 100 }]}
              onPress={() => editItem()}
            >
              <Text style={styles.textStyle}> Confirm </Text>
            </Pressable>
          </View>
        </>
      </View>
    </SafeAreaView>
  );
};
