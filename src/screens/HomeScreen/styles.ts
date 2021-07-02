import {StyleSheet} from 'react-native';
import {Colors} from '../../themes';

export default StyleSheet.create({
  pageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: Colors.background,
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    fontSize: 20,
    marginTop: 20,
    color: Colors.submit,
  },
  listContainer: {
    marginTop: 10,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  buttonRace: {
    position: 'absolute',
    bottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
