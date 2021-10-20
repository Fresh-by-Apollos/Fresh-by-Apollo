import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  textContainer: {
    top: 45,
  },
  baseText: {
    fontSize: 15,
  },
});

export default styles;
