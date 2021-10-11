import { StyleSheet } from "react-native"

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    backgroundColor: '#4C956C',
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {},
  isEmpty: {
    fontSize: 20
  },
  notEmpty: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    height: 100,
    width: 100
  },
  fridgeItems: {}
})

export default styles
