import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  titleText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4C956C',
    margin: '15%',
  },
  checkboxContainer: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
    width: '80%',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  checkboxDetail: {
    fontSize: 20,
  },
});

export default styles;
