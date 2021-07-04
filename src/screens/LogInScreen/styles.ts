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
    marginLeft: 30,
    marginRight: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  section: {
    height: 200,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    fontSize: 20,
    marginTop: 20,
  },
  input: {
    marginTop: 30,
    width: '100%',
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
});
