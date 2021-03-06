import * as React from 'react';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Screens
import BarcodeScreen from './BarcodeScreen';
import BarcodeLookUpModal from './Modals/BarcodeLookUpModal';
import SearchLookUpModal from './Modals/SearchLookUpModal';

const BarcodeStack = createNativeStackNavigator();

export default function BarcodeNav({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <BarcodeStack.Navigator
        screenOptions={{
          headerShown: true,
          title: 'ADD TO FRIDGE',
          headerStyle: {
            backgroundColor: '#4C956C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <BarcodeStack.Screen
          options={{
            headerRight: () => (
              <Pressable onPress={(props) => setModalVisible(true)}>
                <AntDesign name="search1" size={30} color="white" />
              </Pressable>
            ),
          }}
          name="BarcodeScreen"
          component={BarcodeScreen}
        />
        <BarcodeStack.Screen
          name="BarcodeInfoScreen"
          component={BarcodeLookUpModal}
        />
      </BarcodeStack.Navigator>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <SearchLookUpModal
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
      </Modal>
    </>
  );
}
