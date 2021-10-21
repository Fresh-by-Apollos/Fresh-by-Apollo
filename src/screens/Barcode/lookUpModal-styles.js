import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
    width: deviceWidth,
    height: '100%',
  },
  centeredView1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: deviceWidth,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView1: {
    width: deviceWidth,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: '#4C956C',
    height: 38,
  },
  buttonOpen: {
    backgroundColor: '#4C956C',
  },
  buttonClose: {
    backgroundColor: '#4C956C',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  // ---------------->>>
  listOfItemsContainer: {
    height: '100%',
    width: deviceWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '5%',
  },
  container: {
    width: '80%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: '4%',
    paddingRight: '10%',

    // shadowOffset: {
    //   width: 5,
    //   height: 5,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 5,
    // borderBottomColor: 'black',
    // elevation: 4,
  },
  imageStyle: {
    height: '70%',
    width: '15%',
    opacity: 0.9,
    resizeMode: 'contain',
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },

  //   ----------------------
  container2: {
    height: '10%',
    width: deviceWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    height: '6%',
    width: deviceWidth,
    backgroundColor: '#4C956C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: '5%',
  },
  captionText: {
    fontSize: 18,
    fontWeight: '500',
  },
  loginFormContainer: {
    flex: 2,
    // alignItems: "center",

    // justifyContent: "space-evenly",
    // marginBottom: "70%",
    flexDirection: 'row',
  },
  signupFormContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // marginBottom: "25%",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4C956C',
  },
  inputStyle: {
    height: 40,
    width: 230,
    padding: 10,
    textAlign: 'left',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 15,
  },
  loginButton: {
    flex: 0.15,
    // justifyContent: "center",
    // alignItems: "center",
    width: 300,
    height: '20%',
    backgroundColor: '#4C956C',
    borderRadius: 20,
  },
  signupButton: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: '20%',
    backgroundColor: '#4C956C',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  numericInput: {
    position: 'absolute',
    left: 40,
    top: 299,
  },
  scrollViewContainer: {
    height: 500,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewheader: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomColor: 'black',
    textAlign: 'center',
  },
  scrollHeaderContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingBottom: '2%',
  },
});

export default styles;
