import {StyleSheet} from 'react-native';
import {Colors} from '../../themes';

export default StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.white,
    margin: 5,
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  itemLoser: {
    opacity: 0.3,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemImage: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  itemWin: {
    position: 'absolute',
    right: 50,
    top: 10,
  },
  itemStateContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  itemState: {
    fontSize: 14,
    width: 100,
    opacity: 0.4,
    textAlign: 'center',
    color: 'white',
  },
  itemStateNotYet: {
    backgroundColor: 'red',
  },
  itemStateInProgress: {
    backgroundColor: 'green',
  },
  itemStateCalculated: {
    backgroundColor: 'blue',
  },
});
