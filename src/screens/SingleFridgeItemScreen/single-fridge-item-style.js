import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '40%',
    marginBottom: '2%',
    borderBottomWidth: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: '100%',
    width: '50%',
  },
  macroContainer: {
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  nameText: {
    fontSize: 17,
    fontWeight: '600',
  },
  baseText: {
    fontSize: 15,
  },
  marcoTitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    margin: '1%',
  },
  servingsContainer: {
    flexDirection: 'row',
    height: '8%',
    width: '70%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default styles;
