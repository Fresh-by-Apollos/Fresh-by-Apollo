import React, { useState, useEffect } from "react";
import { View, Platform, StyleSheet, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import FridgeScreen from "../FridgeScreen";

import Filters from "./Filters";

import { useStorage } from "../../../store/Context";

export default function Topbar({ navigation }) {
  const { fridgeState } = useStorage();
  const [filter, setFilter] = useState(fridgeState);
  const [filterCounter, setFilterCounter] = useState(0);
  const [active, setActive] = useState({ name: "all" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("infinite loop?");
    setFilter(fridgeState);
    setActive({ name: "all" });
  }, [fridgeState]);

  const findItem = () => {
    setActive({});
    setFilterCounter(0);
    let result = fridgeState.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(result);
  };

  const refrigeratorItems = fridgeState.filter(
    (item) => item.storage === "fridge"
  );
  const freezerItems = fridgeState.filter((item) => item.storage === "freezer");

  const pantryItems = fridgeState.filter((item) => item.storage === "pantry");

  const filters = [
    {
      name: "all",
      label: "All Items",
      type: "RADIO_BUTTON",
      onPress: () => {
        setFilter(fridgeState);
        setFilterCounter(0);
        setActive({ name: "all" });
      },
    },
    {
      name: "fridge",
      label: "Refrigerated Items",
      type: "RADIO_BUTTON",
      onPress: () => {
        console.log(refrigeratorItems);
        setFilter(refrigeratorItems);
        setFilterCounter(1);
        setActive({ name: "fridge" });
      },
    },
    {
      name: "freezer",
      label: "Freezer Items",
      type: "RADIO_BUTTON",
      onPress: () => {
        setFilter({});
        console.log(freezerItems);
        setFilter(freezerItems);
        setFilterCounter(1);
        setActive({ name: "freezer" });
      },
    },
    {
      name: "pantry",
      label: "Pantry Items",
      type: "RADIO_BUTTON",
      onPress: () => {
        setFilter(pantryItems);
        setFilterCounter(1);
        setActive({ name: "pantry" });
      },
    },
  ];

  return (
    <View style={styles.container}>
      {/* do not remove this line underneath*/}
      <View style={styles.header}>
        <SearchBar
          // showCancel={true}
          // showLoading={true}
          inputStyle={{ color: "black" }}
          inputContainerStyle={{
            borderRadius: 12,
            backgroundColor: "white",
            width: "95%",
            height: 38,
            alignItems: "center",
          }}
          onClear={() => {
            setFilter(fridgeState);
            setFilterCounter(0);
            setActive({ name: "all" });
          }}
          containerStyle={{
            backgroundColor: "#4C956C",
            height: 72,
            paddingTop: 16,
          }}
          placeholder="Search an item..."
          onChangeText={setSearch}
          value={search}
          onChange={findItem}
        />
      </View>
      <Filters
        filters={filters}
        activeFiltersCount={filterCounter}
        activeFiltersMap={active.name}
      />
      <FridgeScreen navigation={navigation} display={filter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: "30%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: 0,
    backgroundColor: "#4C956C",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    // lineHeight: 20,
    color: "#FFFFFF",
  },
});
