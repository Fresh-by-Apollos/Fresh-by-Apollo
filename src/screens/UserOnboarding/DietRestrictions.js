import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, Switch } from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const DietRestrictions = ({ navigation }) => {
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [gluten_free, setGlutenFree] = useState(false);
  const [kosher, setKosher] = useState(false);
  const [keto, setKeto] = useState(false);
  const [dairy_free, setDairyFree] = useState(false);
  const [lactose_intolerant, setLactoseIntolerant] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Diet Restrictions</Text>
      <SafeAreaView style={styles.checkboxContainer}>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Vegan</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4C956C" }}
            ios_backgroundColor="#3e3e3e"
            value={vegan}
            onValueChange={setVegan}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Vegetarian</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4C956C" }}
            ios_backgroundColor="#3e3e3e"
            value={vegetarian}
            onValueChange={setVegetarian}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Gluten-Free</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4C956C" }}
            ios_backgroundColor="#3e3e3e"
            value={gluten_free}
            onValueChange={setGlutenFree}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Kosher</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4C956C" }}
            ios_backgroundColor="#3e3e3e"
            value={kosher}
            onValueChange={setKosher}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Keto</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4C956C" }}
            ios_backgroundColor="#3e3e3e"
            value={keto}
            onValueChange={setKeto}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Dairy-Free</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4C956C" }}
            ios_backgroundColor="#3e3e3e"
            value={dairy_free}
            onValueChange={setDairyFree}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.checkboxItem}>
          <Text style={styles.checkboxDetail}>Lactose Intolerant</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4C956C" }}
            ios_backgroundColor="#3e3e3e"
            value={lactose_intolerant}
            onValueChange={setLactoseIntolerant}
          />
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.buttonContainer}>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            navigation.navigate("Allergies", {
              vegan,
              vegetarian,
              gluten_free,
              kosher,
              keto,
              dairy_free,
              lactose_intolerant,
            });
          }}
        >
          <Text style={styles.buttonText}>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default DietRestrictions;
