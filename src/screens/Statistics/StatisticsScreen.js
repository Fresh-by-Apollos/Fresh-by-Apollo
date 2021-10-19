import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, ScrollView } from 'react-native'
import { useStorage } from '../../store/Context'
import styles from './statistics-style'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from 'firebase';
import { VictoryPie, VictoryLegend } from "victory-native";

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
      <ScrollView contentContainerStyle={styles.scrollView}>
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
          <Text style={styles.header}>Current Fridge Stats</Text>
          <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: 400 }} />
          <VictoryLegend
            x={80} y={10}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: "Protein", symbol: { fill: "#5CB44E", type: "square" } },
              { name: "Carbs", symbol: { fill: "#5A7BCE", type: "square" } },
              { name: "Fat", symbol: { fill: "#CE5A5A", type: "square" } }
            ]}
            height={30}
          />
          <VictoryPie
            data={[
              { x: `${totalMacros.protein}g`, y: totalMacros.protein },
              { x: `${totalMacros.carbs}g`, y: totalMacros.carbs },
              { x: `${totalMacros.fat}g`, y: totalMacros.fat }
            ]}
            colorScale={[ '#5CB44E', '#5A7BCE', '#CE5A5A' ]}
            padAngle={2}
            innerRadius={50}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.pastFridgeContainer}>
          <Text style={styles.pastHeader}>Past Fridge Stats</Text>
          <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: 400 }} />
          <VictoryLegend
            x={80} y={10}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: "Consumed", symbol: { fill: "#5CB44E", type: "square" } },
              { name: "Thrown Out", symbol: { fill: "#CE5A5A", type: "square" } }
            ]}
            height={30}
          />
          <VictoryPie
            data={[
              { x: `${(totalBreakdown.consumed / totalItems) * 100}%`, y: (totalBreakdown.consumed / totalItems) * 100 },
              { x: `${(totalBreakdown.thrownOut / totalItems) * 100}%`, y: (totalBreakdown.thrownOut / totalItems) * 100 }
            ]}
            colorScale={[ '#5CB44E', '#CE5A5A' ]}
            padAngle={2}
            innerRadius={50}
            labelRadius={({ innerRadius }) => innerRadius + 105 }
            style={{ labels: { fontSize: 10 } }, styles.chart}
          />
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default StatisticsScreen
