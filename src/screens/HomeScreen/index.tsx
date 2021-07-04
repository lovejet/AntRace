import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Button,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useStateWithCallbackLazy} from 'use-state-with-callback';

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
  const [ants, setAnts] = useStateWithCallbackLazy<AntExpand[]>([]);
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
        null,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, null);
  };

  /**
   * Calculate Odds
   */
  const calculateOdds = (currentAnts: AntExpand[]) => {
    let calculatedCount = 0;

    ants.forEach((ant: AntExpand, index: number) => {
      const callback = (likelihoodOfAntWinning: number) => {
        const newAnts = [...currentAnts];
        newAnts[index].odds = likelihoodOfAntWinning;
        newAnts[index].state = ANT_STATE.CALCULATED;

        calculatedCount++;
        if (calculatedCount === ants.length) {
          setRaceState(ANT_STATE.CALCULATED);
        }

        setAnts(newAnts, null);
      };
      generateAntWinLikelihoodCalculator()(callback);
    });
  };

  /**
   * start calculating
   */
  const startCalculating = () => {
    setAnts(
      (prev: AntExpand[]) => {
        return prev.map((ant: AntExpand) => {
          return {
            ...ant,
            state: ANT_STATE.IN_PROGRESS,
          };
        });
      },
      (currentAnts: AntExpand[]) => {
        calculateOdds(currentAnts);
      },
    );
  };

  /**
   * Start Race
   */
  const handleButton = () => {
    if (raceState === ANT_STATE.NOT_YET_RUN) {
      setRaceState(ANT_STATE.IN_PROGRESS);
      startCalculating();
    } else if (raceState === ANT_STATE.CALCULATED) {
      setRaceState(ANT_STATE.NOT_YET_RUN);
      reset();
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
