import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, Text, View } from 'react-native'
import { useStorage } from '../../store/Context'
import styles from './statistics-style'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from 'firebase';

//
import { VictoryPie } from "victory-native";
const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];
//

function StatisticsScreen({ navigation }) {
  const { fridgeState } = useStorage()
  const [ totalMacros, setTotalMacros ] = useState({})
  const [ totalBreakdown, setTotalBreakdown ] = useState({})
  const [ totalItems, setTotalItems ] = useState(0)

  const fetchTotal = async(items) => {
    let total = {
      protein: 0,
      carbs: 0,
      fat: 0
    }
    items.forEach((item) => {
      total.protein += item.protein
      total.carbs += item.carbs
      total.fat += item.fat
    })
    setTotalMacros(total)
  }

  const fetchTotalConsumed = async() => {
    const userId = firebase.auth().currentUser.uid
    const pastFridgeRef = firebase
      .firestore()
      .collection(`/users/${userId}/pastFridge`)
    let total = {
      consumed: 0,
      thrownOut: 0
    }
    const snapshot = await pastFridgeRef
      .get()
      .then((querySnapshot) => {
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { ...doc.data() }
        })
        return tempDoc
      })
    snapshot.forEach((item) => {
      item.wasConsumed ? total.consumed++ : total.thrownOut++
    })
    setTotalItems(snapshot.length)
    setTotalBreakdown(total)
  }

  useEffect(() => {
    fetchTotal(fridgeState),
    fetchTotalConsumed()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <MaterialCommunityIcons
        style={styles.statsIcon}
        name="chart-pie"
        size={32}
        color="#D68C45"
        onPress={() => navigation.navigate("My Fridge")}
      />
      <MaterialCommunityIcons
        style={styles.statsArrowIcon}
        name="menu-right"
        size={32}
        color="#D68C45"
        onPress={() => navigation.navigate("My Fridge")}
      />
      <SafeAreaView style={styles.currentFridgeContainer}>

        <VictoryPie
          data={[
            { x: 'Protein', y: totalMacros.protein },
            { x: 'Carbs', y: totalMacros.carbs },
            { x: 'Fat', y: totalMacros.fat }
          ]}
        />

        <Text style={styles.header}>Current Fridge Stats</Text>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: 370 }} />
        <Text style={styles.text}>Protein: {totalMacros.protein}g</Text>
        <Text style={styles.text}>Carbs: {totalMacros.carbs}g</Text>
        <Text style={styles.text}>Fat: {totalMacros.fat}g</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.pastFridgeContainer}>
        <Text style={styles.header}>Past Fridge Stats</Text>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: 370 }} />
        <Text style={styles.text}>Consumed: {(totalBreakdown.consumed / totalItems) * 100}%</Text>
        <Text style={styles.text}>Thrown Out: {(totalBreakdown.thrownOut / totalItems) * 100}%</Text>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default StatisticsScreen
