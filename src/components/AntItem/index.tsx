import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AntSvg} from '../svg';
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
const AntItem = ({item}: {item: AntExpand}) => {
  return (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>Name: {item.name}</Text>
        <Text style={styles.itemTitle}>Weight: {item.weight}</Text>
        <Text style={styles.itemTitle}>Length: {item.length}</Text>
        <Text style={styles.itemTitle}>
          Chance: {item.state !== ANT_STATE.CALCULATED ? '-' : item.odds}
        </Text>
        <View style={styles.itemImage}>
          <AntSvg color={item.color.toLowerCase()} />
        </View>
        <View style={styles.itemStateContainer}>
          <Text style={[styles.itemState, state2Style(item.state)]}>
            {item.state}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AntItem;
