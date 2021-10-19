import React from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import styles from "./single-fridge-item-style";
import { formatDistance } from "date-fns";
import { VictoryPie, VictoryLegend } from "victory-native";

function SingleFridgeItemScreen({ route }) {
  const {
    name,
    imageUrl,
    expirationDate,
    servings,
    allergens,
    // dietFlags,
    protein,
    carbs,
    fat,
  } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Selected Item</Text> */}
      <ScrollView>
        <View>
          <SafeAreaView style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </SafeAreaView>
          <SafeAreaView style={styles.otherData}>
            <Text style={styles.baseText}>Item Name: {name}</Text>
            <Text> </Text>
            <Text style={styles.baseText}>Servings: {servings}</Text>
            <Text style={styles.baseText}>
              Expires:{" "}
              {formatDistance(
                new Date(expirationDate.seconds * 1000),
                new Date(),
                { addSuffix: true }
              )}
            </Text>
            <Text> </Text>
            <Text style={styles.baseText}>
              Allergens: {allergens.length ? allergens.join(", ") : "N/A"}
            </Text>
            {/* <Text style={styles.baseText}>
              Diet Flags:{" "}
              {dietFlags.length ? dietFlags.join(", ") : "N/A"}
            </Text> */}
          </SafeAreaView>
          <SafeAreaView>
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
                  { x: `${protein}g`, y: protein },
                  { x: `${carbs}g`, y: carbs },
                  { x: `${fat}g`, y: fat }
                ]}
                colorScale={[ '#5CB44E', '#5A7BCE', '#CE5A5A' ]}
                padAngle={2}
                innerRadius={50}
                // startAngle={90}
                // endAngle={-90}
              />
          </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SingleFridgeItemScreen;
