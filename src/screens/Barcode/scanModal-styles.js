import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: deviceHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: deviceWidth,
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 20,
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
  expirationContainer: {
    borderWidth: 1,
    padding: '5%',
    borderRadius: 15,
    borderColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  expirationBtn: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '30%',
    width: '25%',
    marginRight: '8%',
  },
  expirationText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    height: '30%',
    padding: '2%',
    elevation: 2,
    backgroundColor: '#4C956C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    borderRadius: 20,
    height: '40%',
    padding: '2%',
    elevation: 2,
    backgroundColor: '#4C956C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button3: {
    borderRadius: 20,
    height: '35%',
    padding: '2%',

    elevation: 2,
    backgroundColor: '#4C956C',
    // alignItems: "center",
    justifyContent: 'center',
  },
  buttonOpen: {
    backgroundColor: '#4C956C',
  },
  buttonClose: {
    backgroundColor: '#4C956C',
  },
  expireContainer: {
    height: '30%',
    width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
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
  container: {
    height: '30%',
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    height: '9%',
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
  headerContainer2: {
    height: '9%',
    width: deviceWidth,
    backgroundColor: '#36454F',
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
  headerText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: '7%',
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: 'white',
    height: '70%',
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderBottomColor: 'black',
    elevation: 9,
  },
  imageStyle: {
    height: 90,
    width: 40,
    opacity: 0.9,
    marginLeft: 30,
    marginTop: 10,
    resizeMode: 'contain',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  infoStyle: {
    height: '100%',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },

  // For item not found modal
  modalHeader: {
    width: deviceWidth,
    height: '10%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '7%',
  },
  modalDetail: {
    fontSize: 15,
    marginBottom: '7%',
  },
  throwOutBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: '5%',
  },
  buttonClose1: {
    backgroundColor: '#D54C4C',
  },
  servingsContainer: {
    flexDirection: 'row',
    height: '10%',
    width: '70%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default styles;
