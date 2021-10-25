// @flow
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} from "react-native";

const Touchable = Platform.select({
  web: ({ ...props }) => (
    <TouchableHighlight underlayColor="#6284d7" {...props} />
  ),
  default: TouchableOpacity,
});

const ListItemButton = ({ active, onPress, text, icon }) => {
  const containerStyle = [styles.container];
  const textStyle = [styles.text];

  if (active) {
    containerStyle.push(styles.containerActive);
    textStyle.push(styles.textActive);
  }

  return (
    <Touchable
      style={styles.button}
      onPress={() => {
        onPress && onPress();
      }}
    >
      <View style={containerStyle}>
        {icon && icon}
        {/* {console.log(onPress)} */}
        <Text numberOfLines={1} ellipsizeMode="clip" style={textStyle}>
          {text}
        </Text>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: "#556d7c",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    paddingHorizontal: 12,
  },
  containerActive: {
    backgroundColor: "orange",
    marginLeft: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 18,
    color: "#FFFFFF",
    ...Platform.select({ web: { textOverflow: "clip" }, default: {} }),
  },
  textActive: {
    color: "white",
  },
});

export default ListItemButton;
