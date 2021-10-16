import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    backgroundColor: "#4C956C",
    color: "white",
    fontWeight: "bold",
  },
  imageContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  otherData: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    flexShrink: 1,
  },
  scrollView: {},
  isEmpty: {
    fontSize: 20,
  },
  notEmpty: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    height: 100,
    width: 100,
  },
  fridgeItems: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,

    shadowColor: "green",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    // borderBottomColor: "black",
  },
  baseText: {
    flexShrink: 1,
  },
  itemNameText: {
    position: "absolute",
    top: 7,
    fontWeight: "bold",
    maxWidth: 200,
  },
  icon: {
    position: "absolute",
    top: 3,
    left: 215,
  },

  // -----------
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: deviceWidth,
    height: 550,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4C956C",
  },
  buttonOpen: {
    backgroundColor: "#4C956C",
  },
  buttonClose: {
    backgroundColor: "#4C956C",
  },
  buttonClose1: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default styles;
