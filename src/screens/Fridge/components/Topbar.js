import React, { useState } from "react";
import {
  Dimensions,
  Linking,
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import FridgeScreen from "../FridgeScreen";

import IconMediumLogo from "./IconMediumLogo";
import Filters from "./Filters";

import { useStorage } from "../../../store/Context";

const MEDIUM_ARTICLE_URL = "https://medium.com/p/2bdde7a4f16c/";
const SCREEN_WIDTH = Dimensions.get("screen").width;

export default function Topbar({ navigation }) {
  const { fridgeState } = useStorage();
  const [filter, setFilter] = useState(fridgeState);
  const [filterCounter, setFilterCounter] = useState(0);
  const [active, setActive] = useState({ name: "all" });

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
      <View style={styles.header}></View>
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingTop: Platform.select({ web: 1, default: 10 }),
    paddingBottom: 0,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 20,
    color: "#FFFFFF",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 30,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: "500",
    fontFamily: Platform.select({ web: "Serif", default: undefined }),
    textDecorationLine: "underline",
  },
  tip: {
    width: 400,
    marginTop: 100,
    textAlign: "center",
    color: "#777",
  },
});
