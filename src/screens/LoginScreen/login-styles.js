import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    maxHeight: 400,
  },
  titleText: {
    fontSize: 30,
    margin: 10,
    fontWeight: 'bold',
    color: '#4C956C',
  },
  inputStyle: {
    height: 40,
    width: 300,
    padding: 10,
    textAlign: 'left',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
  },
  submitButton: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: '10%',
    backgroundColor: '#4C956C',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
