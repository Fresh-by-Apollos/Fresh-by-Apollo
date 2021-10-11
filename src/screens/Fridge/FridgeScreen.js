import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { fridgeState } from '../../store/reducers/fridgeReducer';
// import { fetchFridgeItems } from "../store/reducers/fridgeReducer";

function FridgeScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.testText]}>Hello World!</Text>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  testText: {
    fontWeight: 'bold'
  }
})

export default FridgeScreen
