import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import styles from "./single-fridge-item-style";
import { formatDistance } from "date-fns";
import { VictoryBar, VictoryLegend } from "victory-native";

function SingleFridgeItemScreen({ route }) {
  const {
    name,
    imageUrl,
    expirationDate,
    servings,
    allergens,
    dietFlags,
    protein,
    carbs,
    fat,
  } = route.params;
  const [ timeToExpire ] = useState(new Date(expirationDate.seconds * 1000) - new Date())

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Selected Item</Text> */}
      <ScrollView>
        <View>
          <SafeAreaView style={styles.dataContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <SafeAreaView style={styles.textContainer}>
              <Text style={styles.baseText}>Name: {name}</Text>
              <Text> </Text>
              <Text style={styles.baseText}>Servings: {servings}</Text>
              <Text> </Text>
              <Text
              style={{
                color: timeToExpire > 0 ? 'black' : '#D54C4C',
                ...styles.baseText,
              }}
              >
                {timeToExpire > 0 ? 'Expires ' : 'Expired '}
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
              <Text> </Text>
              <Text style={styles.baseText}>
                Diet Flags:{' '}
                {dietFlags.length ? dietFlags.join(', ') : 'N/A'}
              </Text>
            </SafeAreaView>
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
              <VictoryBar
                horizontal
                data={[
                  { y: protein, fill: '#5CB44E' },
                  { y: carbs, fill: '#5A7BCE' },
                  { y: fat, fill: '#CE5A5A'}
                ]}
                style={{ data: { fill: ({ datum }) => datum.fill }}}
                barWidth={35}
                labels={({ datum }) => `${datum.y}g`}
              />
          </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SingleFridgeItemScreen;
