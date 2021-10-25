import firebase from "firebase";
import styles from "./statistics-style";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, Dimensions } from "react-native";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Libraries
import { VictoryPie, VictoryLegend } from "victory-native";

// Context
import { useStorage } from "../../store/Context";

function StatisticsScreen({ navigation }) {
  const { fridgeState } = useStorage();
  const [totalMacros, setTotalMacros] = useState({});
  const [totalBreakdown, setTotalBreakdown] = useState({});
  const [totalItems, setTotalItems] = useState(0);

  const fetchTotal = async (items) => {
    let total = {
      protein: 0,
      carbs: 0,
      fat: 0,
    };
    items.forEach((item) => {
      total.protein = total.protein + item.protein * item.servings;
      total.carbs = total.carbs + item.carbs * item.servings;
      total.fat = total.fat + item.fat * item.servings;
    });
    setTotalMacros(total);
  };

  const fetchTotalConsumed = async () => {
    const userId = firebase.auth().currentUser.uid;
    const pastFridgeRef = firebase
      .firestore()
      .collection(`/users/${userId}/pastFridge`);
    let total = {
      consumed: 0,
      thrownOut: 0,
    };
    const snapshot = await pastFridgeRef.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { ...doc.data() };
      });
      return tempDoc;
    });
    snapshot.forEach((item) => {
      item.wasConsumed
        ? (total.consumed = total.consumed + item.servings)
        : (total.thrownOut = total.thrownOut + item.servings);
    });
    let grandTotal = total.consumed + total.thrownOut
    setTotalItems(grandTotal);
    setTotalBreakdown(total);
  };

  useEffect(() => {
    fetchTotal(fridgeState), fetchTotalConsumed();
  }, []);

  const deviceWidth = Math.round(Dimensions.get("window").width);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SafeAreaView style={styles.currentFridgeContainer}>
          <Text style={styles.header}>Current Fridge Stats</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 2,
              width: deviceWidth,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <VictoryLegend
            x={80}
            y={10}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: "Protein", symbol: { fill: "#5f0f40", type: "square" } },
              { name: "Carbs", symbol: { fill: "#0f4c5c", type: "square" } },
              { name: "Fat", symbol: { fill: "#fb8b24", type: "square" } },
            ]}
            height={30}
            width={deviceWidth * 0.8}
          />
          <VictoryPie
            data={[
              { x: `${Math.round(totalMacros.protein)}g`, y: totalMacros.protein },
              { x: `${Math.round(totalMacros.carbs)}g`, y: totalMacros.carbs },
              { x: `${Math.round(totalMacros.fat)}g`, y: totalMacros.fat },
            ]}
            colorScale={["#5f0f40", "#0f4c5c", "#fb8b24"]}
            padAngle={2}
            innerRadius={50}
            width={deviceWidth}
            padding={deviceWidth * 0.2}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.pastFridgeContainer}>
          <Text style={styles.pastHeader}>Past Fridge Stats</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 2,
              width: 400,
            }}
          />
          <VictoryLegend
            x={80}
            y={10}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: "Consumed", symbol: { fill: "#2a9d8f", type: "square" } },
              {
                name: "Thrown Out",
                symbol: { fill: "#d62828", type: "square" },
              },
            ]}
            height={30}
          />
          <VictoryPie
            data={[
              {
                x: `${Math.round((totalBreakdown.consumed / totalItems) * 100)}%`,
                y: (totalBreakdown.consumed / totalItems) * 100,
              },
              {
                x: `${Math.round((totalBreakdown.thrownOut / totalItems) * 100)}%`,
                y: (totalBreakdown.thrownOut / totalItems) * 100,
              },
            ]}
            colorScale={["#2a9d8f", "#d62828"]}
            padAngle={2}
            innerRadius={50}
            labelRadius={({ innerRadius }) => innerRadius + 105}
            style={({ labels: { fontSize: 10 } }, styles.chart)}
          />
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default StatisticsScreen;
