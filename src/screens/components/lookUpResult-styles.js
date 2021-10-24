import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: deviceWidth,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  resultContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  itemDetailContainer: {
    flexDirection: "row",
    height: "30%",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  itemName: {
    fontSize: 25,
    fontWeight: "600",
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "#4C956C",
    height: "70%",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },

  expirationContainer: {
    borderWidth: 1,
    padding: "4%",
    borderRadius: 15,
    borderColor: "lightgray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  expirationText: {
    fontSize: 15,
    fontWeight: "600",
  },

  calendarBtn: {
    height: "80%",
    width: "20%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#4C956C",
    borderRadius: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "18%",
    width: "70%",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  // ---------------->>>
  imageStyle: {
    height: "70%",
    width: "30%",
    resizeMode: "contain",
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "800",
    position: "absolute",
    left: 80,
    top: -85,
  },
  errorContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#D54C4C",
    marginTop: "7%",
    width: "45%",
  },
});

export default styles;
