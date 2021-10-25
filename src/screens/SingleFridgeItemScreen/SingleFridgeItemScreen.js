import {
  View,
  Text,
  Image,
  Modal,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './single-fridge-item-style';
import React, { useState, useEffect } from 'react';

// Context
import { useStorage } from '../../store/Context';

// Libraries
import { formatDistance } from 'date-fns';
import { VictoryBar, VictoryLegend } from 'victory-native';

// Modals
import SingleItemEditModal from './Modals/SingleItemEditModal';

function SingleFridgeItemScreen({ route }) {
  const { id } = route.params;
  const { fridgeState } = useStorage();

  const [loading, setLoading] = useState(true);
  const [fridgeItem, setFridgeItem] = useState();
  const [timeToExpire, setTimeToExpire] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const itemData = fridgeState.filter((item) => item.id === id);
      const getFridgeItem = () => {
        setFridgeItem(...itemData);
      };
      getFridgeItem();
      setTimeToExpire(
        new Date(itemData[0].expirationDate.seconds * 1000) - new Date()
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [fridgeState]);

  const deviceWidth = Math.round(Dimensions.get('window').width);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <ScrollView>
            <View>
              <SafeAreaView style={styles.dataContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: fridgeItem.imageUrl }}
                />
                <SafeAreaView style={styles.textContainer}>
                  <Text style={styles.nameText}>
                    {fridgeItem.name.split(' ').map((word) => {
                      return word.charAt(0).toUpperCase() + word.slice(1) + ' ';
                    })}
                  </Text>
                  <Text style={styles.baseText}>
                    Servings: {fridgeItem.servings}
                  </Text>
                  <Text
                    style={{
                      color: timeToExpire > 0 ? 'black' : '#D54C4C',
                      ...styles.baseText,
                    }}
                  >
                    {timeToExpire > 0 ? 'Expires ' : 'Expired '}
                    {formatDistance(
                      new Date(fridgeItem.expirationDate.seconds * 1000),
                      new Date(),
                      { addSuffix: true }
                    )}
                  </Text>
                  <Text style={styles.baseText}>
                    Allergens:{' '}
                    {fridgeItem.allergens.length
                      ? fridgeItem.allergens.join(', ')
                      : 'N/A'}
                  </Text>
                  <Text style={styles.baseText}>
                    Diet Flags:{' '}
                    {fridgeItem.dietFlags.length
                      ? fridgeItem.dietFlags.join(', ')
                      : 'N/A'}
                  </Text>
                </SafeAreaView>
              </SafeAreaView>
              <SafeAreaView style={styles.macroContainer}>
                <Text style={styles.marcoTitle}>Nutrient Breakdown</Text>
                <VictoryLegend
                  x={80}
                  y={10}
                  orientation="horizontal"
                  gutter={20}
                  data={[
                    {
                      name: 'Protein',
                      symbol: { fill: '#5f0f40', type: 'square' },
                    },
                    {
                      name: 'Carbs',
                      symbol: { fill: '#0f4c5c', type: 'square' },
                    },
                    {
                      name: 'Fat',
                      symbol: { fill: '#fb8b24', type: 'square' },
                    },
                  ]}
                  height={30}
                  width={deviceWidth}
                />
                <SafeAreaView
                  style={{
                    width: deviceWidth,
                  }}
                >
                  <VictoryBar
                    horizontal
                    data={[
                      { y: fridgeItem.fat, fill: '#fb8b24' },
                      { y: fridgeItem.carbs, fill: '#0f4c5c' },
                      { y: fridgeItem.protein, fill: '#5f0f40' },
                    ]}
                    style={{ data: { fill: ({ datum }) => datum.fill } }}
                    barWidth={35}
                    labels={({ datum }) => `${datum.y} g`}
                    width={deviceWidth * 0.9}
                    padding={deviceWidth * 0.17}
                  />
                </SafeAreaView>
              </SafeAreaView>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{
                    borderWidth: 1,
                    width: '20%',
                    borderColor: 'green',
                    padding: 10,
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'green' }}>
                    EDIT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <SingleItemEditModal
              item={fridgeItem}
              setModalVisible={setModalVisible}
            />
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}

export default SingleFridgeItemScreen;
