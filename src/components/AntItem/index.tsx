import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AntSvg, WinnerSvg} from '../svg';
import {AntExpand} from '../../models/ant';
import {ANT_STATE} from '../../util/ant-state';
import styles from './styles';

const state2Style = (s: string) => {
  if (s === ANT_STATE.NOT_YET_RUN) {
    return styles.itemStateNotYet;
  } else if (s === ANT_STATE.IN_PROGRESS) {
    return styles.itemStateInProgress;
  } else {
    return styles.itemStateCalculated;
  }
};

/**
 * Flatlist ant item component
 * @param item Ant item
 */
const AntItem = ({item, winner}: {item: AntExpand; winner: number}) => {
  return (
    <TouchableOpacity disabled={winner !== -1 && item.id !== winner}>
      <View
        style={[
          styles.itemContainer,
          winner !== -1 && item.id !== winner ? styles.itemLoser : null,
        ]}>
        <Text style={styles.itemTitle}>Name: {item.name}</Text>
        <Text style={styles.itemTitle}>Weight: {item.weight}</Text>
        <Text style={styles.itemTitle}>Length: {item.length}</Text>
        <Text style={styles.itemTitle}>
          Chance:{' '}
          {item.state !== ANT_STATE.CALCULATED ? '-' : item.odds.toFixed(2)}
        </Text>
        <View style={styles.itemImage}>
          <AntSvg width={100} height={100} color={item.color.toLowerCase()} />
        </View>
        <View style={styles.itemStateContainer}>
          <Text style={[styles.itemState, state2Style(item.state)]}>
            {item.state}
          </Text>
        </View>

        {winner !== -1 && item.id === winner && (
          <View style={styles.itemWin}>
            <WinnerSvg width={50} height={50} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AntItem;
