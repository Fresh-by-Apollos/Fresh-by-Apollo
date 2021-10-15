import { StyleSheet } from "react-native";

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
    marginLeft: 20,
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
    top: 40
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
  statsIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  statsArrowIcon: {
    position: 'absolute',
    top: 10,
    right: 30
  },
});

export default styles;
