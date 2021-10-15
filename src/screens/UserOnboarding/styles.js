import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  titleText: {
    fontSize: 27,
    fontWeight: 'bold',
    margin: '3%',
  },
  checkboxContainer: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: '10%',
    height: '100%',
    width: '100%',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    height: '7%',
    borderBottomWidth: 1,
  },
  checkboxDetail: {
    fontSize: 20,
  },
  buttonContainer: {
    height: '5%',
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: '100%',
    backgroundColor: '#4C956C',
    borderRadius: 20,
    marginBottom: '10%',
    marginRight: '2%',
    marginLeft: '2%',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: '100%',
    backgroundColor: '#D54C4C',
    borderRadius: 20,
    marginBottom: '10%',
    marginRight: '2%',
    marginLeft: '2%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
