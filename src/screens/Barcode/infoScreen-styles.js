import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  modalHeader: {
    width: deviceWidth,
    height: "10%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "7%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: deviceWidth,
    height: "60%",
    backgroundColor: "white",
    borderRadius: 20,
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
  expirationBtn: {
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "30%",
  },
  button: {
    borderRadius: 20,
    height: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    padding: "3%",
    elevation: 2,
    backgroundColor: "#4C956C",
  },
  buttonOpen: {
    backgroundColor: "#4C956C",
  },
  buttonClose: {
    backgroundColor: "#4C956C",
  },
  expireContainer: {
    height: "30%",
    width: "60%",
    justifyContent: "space-evenly",
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

  // ---------------->>>
  container: {
    height: "30%",
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    height: "9%",
    width: deviceWidth,
    backgroundColor: "#4C956C",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%",
  },
  headerText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginRight: "7%",
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: "white",
    height: "70%",
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderBottomColor: "black",
    elevation: 9,
  },
  imageStyle: {
    height: 90,
    width: 40,
    opacity: 0.9,
    marginLeft: 30,
    marginTop: 10,
    resizeMode: "contain",
  },
  categoryStyle: {
    fontWeight: "200",
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  infoStyle: {
    height: "100%",
    width: "65%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  iconLabelStyle: {
    flexDirection: "row",
    marginTop: 10,
  },
  modalDetail: {
    fontSize: 15,
    marginBottom: "7%",
  },
  throwOutBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: "5%",
    // height: 100,
  },
  buttonClose1: {
    backgroundColor: "#D54C4C",
  },
});

export default styles;
