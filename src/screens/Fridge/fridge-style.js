import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },

  title: {
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    backgroundColor: '#4C956C',
    color: 'white',
    fontWeight: 'bold',
  },

  imageContainer: {
    margin: '2%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '90%',
    width: '27%',
  },

  otherData: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    height: '100%',
    width: '40%',
  },

  scrollView: {},

  isEmpty: {
    fontSize: 20,
  },

  notEmpty: {
    flexDirection: 'column',
    marginTop: '15%',
    height: '100%',
    width: '100%',
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  fridgeItems: {
    flexDirection: 'row',
    width: '93%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3%',
    padding: '4%',
    borderRadius: 15,
    backgroundColor: 'white',

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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '50%',
    width: '100%',
    padding: '3%',
  },

  dotModalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%',
  },

  expireText: {
    fontWeight: 'bold',
  },

  baseText: {
    flexShrink: 1,
  },

  itemNameText: {
    fontWeight: 'bold',
    maxWidth: 200,
  },

  icon: {
    position: 'absolute',
    top: 3,
    left: 215,
  },

  statsIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  statsArrowIcon: {
    position: 'absolute',
    top: 10,
    right: 30,
  },

  // -----------
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    width: deviceWidth,
    height: 550,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  },

  buttonOpen: {
    backgroundColor: '#4C956C',
  },

  buttonClose: {
    backgroundColor: '#4C956C',
  },

  buttonClose1: {
    backgroundColor: 'red',
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
});

export default styles;
