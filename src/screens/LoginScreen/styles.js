import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 45,
    margin: 10,
    fontWeight: "bold",
    color: "#4C956C",
  },
  captionText: {
    fontSize: 17,
  },
  loginFormContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: "50%",
  },
  signupFormContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: "25%",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4C956C",
  },
  inputStyle: {
    height: 40,
    width: 300,
    padding: 10,
    textAlign: "left",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
  },
  loginButton: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: "20%",
    backgroundColor: "#4C956C",
    borderRadius: 20,
  },
  signupButton: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: "20%",
    backgroundColor: "#4C956C",
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
