import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    height: '20%',
  },
  signOutBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D54C4C',
    borderRadius: 15,
    height: '5%',
    width: '60%',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
