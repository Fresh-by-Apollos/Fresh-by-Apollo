import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native'
import { useStorage } from '../../store/Context';
import { fetchFridgeItems } from '../../store/reducers/fridgeReducer'

function FridgeScreen() {
  const { fridgeState, dispatch } = useStorage();

  useEffect(() => {
    fetchFridgeItems(dispatch)
  }, [fridgeState])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Fridge</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {fridgeState.length === 0 ? (
          <View>
            <Text style={styles.isEmpty}>Your fridge is empty!</Text>
          </View>
        ) : (
          <View style={styles.notEmpty}>
            {fridgeState.map((item) => (
              <View style={styles.fridgeItems}>
                <Image style={styles.image} source={{uri: item.imageUrl}} />
                <Text>{item.name}</Text>
                <Text>{item.quantity}</Text>
                {/* <Text>{item.expirationDate.date}</Text> */}
                <Text>{item.allergens}</Text>
                <Text>{item.dietFlags}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    backgroundColor: '#4C956C',
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {},
  isEmpty: {
    fontSize: 20
  },
  notEmpty: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    height: 100,
    width: 100
  },
  fridgeItems: {}
})

export default FridgeScreen
