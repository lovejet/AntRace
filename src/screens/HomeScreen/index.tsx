import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Button,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {Ant, AntExpand} from '../../models/ant';
import styles from './styles';
import {Colors} from '../../themes';
import {useListEntriesQuery} from '../../services/graphql/ant';
import AntItem from '../../components/AntItem';
import {ANT_STATE} from '../../util/ant-state';

const state2ButtonText = (s: string) => {
  if (s === ANT_STATE.NOT_YET_RUN) {
    return 'Start Race';
  } else if (s === ANT_STATE.IN_PROGRESS) {
    return 'Running';
  } else {
    return 'Reset';
  }
};

const HomeScreen = () => {
  const [ants, setAnts] = useState<AntExpand[]>([]);
  const [raceState, setRaceState] = useState<string>(ANT_STATE.NOT_YET_RUN);

  console.log(ants);

  const {data, loading, error} = useListEntriesQuery({
    variables: {},
  });

  useEffect(() => {
    if (data?.ants) {
      setAnts(
        data.ants.map((ant: Ant) => {
          return {
            ...ant,
            state: ANT_STATE.NOT_YET_RUN,
            odds: 0,
          };
        }),
      );
    }
  }, [data]);

  /**
   *
   * @param item Ant item
   */
  const renderItem = ({item}: {item: AntExpand}) => <AntItem item={item} />;

  /**
   * AntWinLikelihoodCalculator
   */
  const generateAntWinLikelihoodCalculator = () => {
    var delay = 7000 + Math.random() * 7000;
    var likelihoodOfAntWinning = Math.random();
    return function (callback: Function) {
      setTimeout(function () {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  };

  /**
   * reset all states of ants
   */
  const reset = () => {
    setAnts((prev: AntExpand[]) => {
      return prev.map((ant: AntExpand) => {
        return {
          ...ant,
          state: ANT_STATE.NOT_YET_RUN,
          odds: 0,
        };
      });
    });
  };

  /**
   * set all states of ants to IN_PROGRESS
   */
  const startCalculating = () => {
    setAnts((prev: AntExpand[]) => {
      return prev.map((ant: AntExpand) => {
        return {
          ...ant,
          state: ANT_STATE.IN_PROGRESS,
        };
      });
    });

    let calculatedCount = 0;

    ants.forEach((ant: AntExpand, index: number) => {
      const callback = (likelihoodOfAntWinning: number) => {
        setAnts((prev: AntExpand[]) => {
          prev[index].state = ANT_STATE.CALCULATED;
          prev[index].odds = likelihoodOfAntWinning;

          return prev;
        });

        calculatedCount++;
        if (calculatedCount === ants.length) {
          setRaceState(ANT_STATE.CALCULATED);
        }
      };
      generateAntWinLikelihoodCalculator()(callback);
    });
  };

  /**
   * Start Race
   */
  const handleButton = () => {
    if (raceState === ANT_STATE.NOT_YET_RUN) {
      startCalculating();
      setRaceState(ANT_STATE.IN_PROGRESS);
    } else if (raceState === ANT_STATE.CALCULATED) {
      reset();
      setRaceState(ANT_STATE.NOT_YET_RUN);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lovejet Ant-Race</Text>
        <View style={styles.listContainer}>
          {!error && loading && (
            <ActivityIndicator size="large" color={Colors.submit} />
          )}
          {!error && !loading && (
            <FlatList
              data={ants}
              renderItem={renderItem}
              keyExtractor={(item: Ant) => `${item.name}`}
            />
          )}
          {error && <Text style={styles.title}>{error.message}</Text>}
        </View>
        {!error && !loading && (
          <Button
            title={state2ButtonText(raceState)}
            onPress={handleButton}
            disabled={raceState === ANT_STATE.IN_PROGRESS}
          />
        )}
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
