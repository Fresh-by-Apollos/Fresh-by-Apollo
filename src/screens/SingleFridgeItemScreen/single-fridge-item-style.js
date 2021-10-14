import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nutritionText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  baseText: {
    fontSize: 18
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 250,
    marginTop: 10,
    marginBottom: 10
  },
  nutrientsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '10%',
    marginTop: 10,
    marginBottom: 10,
  },
  otherData: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  }

});

export default styles;
