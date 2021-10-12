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
  // title: {
  //   fontSize: 40,
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 40,
  //   backgroundColor: "#4C956C",
  //   color: "white",
  //   fontWeight: "bold",
  // },
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'column',
//     height: '100%',
//     width: '100%',
//   },
//   titleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   titleText: {
//     fontSize: 45,
//     margin: 10,
//     fontWeight: 'bold',
//     color: '#4C956C',
//   },
// });

export default styles;
