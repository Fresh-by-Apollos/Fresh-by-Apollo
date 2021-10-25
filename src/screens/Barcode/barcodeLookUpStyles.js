import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 20;
const barcodeLookUpStyles = StyleSheet.create({
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
    margin: "2%",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "80%",
    width: "27%",
  },

  otherData: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    height: "100%",
    width: "40%",
  },

  scrollView: {},

  isEmpty: {
    fontSize: 20,
  },

  notEmpty: {
    flexDirection: "column",
    marginTop: "15%",
    height: "100%",
    width: "100%",
  },

  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },

  fridgeItems: {
    flexDirection: "row",
    width: "93%",
    height: 200,
    alignItems: "center",
    justifyContent: "space-between",
    margin: "3%",
    padding: "4%",
    borderRadius: 15,
    backgroundColor: "white",

    // shadowColor: 'green',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // // borderBottomColor: "black",
  },

  dotModal: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "50%",
    width: "100%",
    padding: "3%",
  },

  dotModalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3%",
  },

  expireText: {
    fontWeight: "bold",
  },

  baseText: {
    flexShrink: 1,
  },

  itemNameText: {
    fontWeight: "bold",
    maxWidth: 200,
  },

  icon: {
    position: "absolute",
    top: 3,
    left: 215,
  },

  statsIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  statsArrowIcon: {
    position: "absolute",
    top: 10,
    right: 30,
  },

  // -----------
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

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4C956C",
    marginTop: "7%",
    width: "45%",
  },

  buttonOpen: {
    backgroundColor: "#4C956C",
  },

  buttonClose: {
    backgroundColor: "#4C956C",
  },

  buttonClose1: {
    backgroundColor: "#D54C4C",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

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

  modalHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    marginRight: "8%",
  },

  modalCancel: {
    marginLeft: "4%",
  },

  throwOutBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: "5%",
  },

  modalDetail: {
    fontSize: 15,
    marginBottom: "7%",
  },
});

export default barcodeLookUpStyles;
