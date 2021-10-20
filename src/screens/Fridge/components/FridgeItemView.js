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
} from 'react-native';
import React, { useState } from 'react';
import styles from '../fridge-style';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Libaries
import { formatDistance } from 'date-fns';
import NumericInput from 'react-native-numeric-input';

// Context
import {
  fetchFridgeItems,
  updateFridgeItem,
} from '../../../store/reducers/fridgeReducer';
import { useStorage } from '../../../store/Context';

function FridgeItemView({ item, navigation }) {
  const { dispatch } = useStorage();
  const [showButtons, setShowButtons] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [servings, setServings] = useState(1);
  const [trashing, setTrashing] = useState(false);
  const [timeToExpire] = useState(
    new Date(item.expirationDate.seconds * 1000) - new Date()
  );

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
          navigation.navigate('Selected Item', {
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
          <Text style={styles.itemNameText}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          <SafeAreaView>
            <Text>Servings: {item.servings}</Text>
            <Text
              style={{
                color: timeToExpire > 0 ? 'black' : '#D54C4C',
                ...styles.expireText,
              }}
            >
              {timeToExpire > 0 ? 'Expires ' : 'Expired '}
              {formatDistance(
                new Date(item.expirationDate.seconds * 1000),
                new Date(),
                { addSuffix: true }
              )}
            </Text>
            <Text style={styles.baseText}>
              Allergens:{' '}
              {item.allergens.length ? item.allergens.join(', ') : 'N/A'}
            </Text>
            <Text style={styles.baseText}>
              Diet Flags:{' '}
              {item.dietFlags.length ? item.dietFlags.join(', ') : 'N/A'}
            </Text>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView>
          <TouchableOpacity
            style={showButtons && { display: 'none' }}
            onPress={() => setShowButtons(true)}
          >
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={32}
              color="darkgray"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={!showButtons && { display: 'none' }}
            onPress={() => setShowButtons(false)}
          >
            <Ionicons
              name="md-arrow-forward-circle-outline"
              size={32}
              color="darkgray"
            />
          </TouchableOpacity>
          <View style={!showButtons ? { display: 'none' } : styles.dotModal}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.dotModalItem}
            >
              <Ionicons name="fast-food-outline" size={24} color="#4C956C" />
              <Text>Consume</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setTrashing(true);
              }}
              style={styles.dotModalItem}
            >
              <FontAwesome name="trash-o" size={24} color="#D54C4C" />
              <Text>Throw out</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {trashing ? (
              <>
                <SafeAreaView
                  style={{
                    backgroundColor: trashing ? '#D54C4C' : '#4C956C',
                    ...styles.modalHeader,
                  }}
                >
                  <Pressable
                    style={styles.modalCancel}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setServings(1);
                      setTrashing(false);
                    }}
                  >
                    <MaterialIcons name="cancel" size={25} color="white" />
                  </Pressable>
                  <Text style={styles.modalHeaderText}>Throw Out Food</Text>
                  <SafeAreaView></SafeAreaView>
                </SafeAreaView>
                <Text style={styles.modalDetail}>
                  Are you sure you want to throw out this item?
                </Text>
                <SafeAreaView style={styles.throwOutBtnContainer}>
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
                </SafeAreaView>
              </>
            ) : (
              <>
                <SafeAreaView
                  style={{
                    backgroundColor: trashing ? '#D54C4C' : '#4C956C',
                    ...styles.modalHeader,
                  }}
                >
                  <Pressable
                    style={styles.modalCancel}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setServings(1);
                      setTrashing(false);
                    }}
                  >
                    <MaterialIcons name="cancel" size={25} color="white" />
                  </Pressable>
                  <Text style={styles.modalHeaderText}>Consume Food</Text>
                  <SafeAreaView></SafeAreaView>
                </SafeAreaView>
                <Text style={styles.modalDetail}>
                  How many servings did you consume?
                </Text>
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
                  iconStyle={{ color: 'white' }}
                  rightButtonBackgroundColor="gray"
                  leftButtonBackgroundColor="lightgray"
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleAction(true)}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

export default FridgeItemView;
