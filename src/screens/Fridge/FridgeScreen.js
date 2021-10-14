import React, { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useStorage } from '../../store/Context';
import { fetchFridgeItems } from '../../store/reducers/fridgeReducer';
import styles from './fridge-style';
import { formatDistance } from 'date-fns';

function FridgeScreen({ navigation }) {
  const { fridgeState, dispatch } = useStorage();

  useEffect(() => {
    console.log('infinite loop?');
    fetchFridgeItems(dispatch);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>My Fridge</Text> */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {fridgeState.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('BarcodeScreen')}
            >
              <Ionicons name="md-add-circle-outline" size={50} color="green" />
            </TouchableOpacity>
            <Text style={{ fontSize: 25 }}>ADD TO FRIDGE</Text>
          </View>
        ) : (
          <View style={styles.notEmpty}>
            {fridgeState.map((item) => (
              //key is upcCode + expiration date
              <TouchableOpacity
                key={
                  `${item.barcode}` +
                  new Date(
                    item.expirationDate.seconds * 1000
                  ).toLocaleDateString('en-US')
                }
                style={styles.fridgeItems}
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
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
                  {/* capitalize first letter */}
                  <View>
                    <Text style={styles.itemNameText}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </Text>
                    <TouchableOpacity>
                      {/* <FontAwesome
                        style={styles.icon}
                        name="trash-o"
                        size={24}
                        color="#cf0000"
                      /> */}
                      <MaterialCommunityIcons
                        style={styles.icon}
                        name="dots-horizontal-circle-outline"
                        size={32}
                        color="darkgray"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 35 }}>
                    <Text>Servings: {item.servings}</Text>
                    <Text>
                      Expires:{' '}
                      {formatDistance(
                        new Date(item.expirationDate.seconds * 1000),
                        new Date(),
                        { addSuffix: true }
                      )}
                    </Text>
                    <Text style={styles.baseText}>
                      Allergens:{' '}
                      {item.allergens.length
                        ? item.allergens.join(', ')
                        : 'N/A'}
                    </Text>
                    {/* <Text style={styles.baseText}>
                    Diet Flags:{" "}
                    {item.dietFlags.length ? item.dietFlags.join(", ") : "N/A"}
                  </Text> */}
                  </View>
                </SafeAreaView>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FridgeScreen;
