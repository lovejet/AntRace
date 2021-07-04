import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useStateWithCallbackLazy} from 'use-state-with-callback';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Ant, AntExpand} from '../../models/ant';
import styles from './styles';
import {Colors} from '../../themes';
import {useListEntriesQuery} from '../../services/graphql/ant';
import AntItem from '../../components/AntItem';
import {ANT_STATE} from '../../util/ant-state';
import AnimatedAntList from '../../components/AnimatedAntList';

const state2ButtonText = (s: string) => {
  if (s === ANT_STATE.NOT_YET_RUN) {
    return 'Start Race';
  } else if (s === ANT_STATE.IN_PROGRESS) {
    return 'Running';
  } else {
    return 'Reset';
  }
};

const HomeScreen = ({navigation}: any) => {
  const [ants, setAnts] = useStateWithCallbackLazy<AntExpand[]>([]);
  const [raceState, setRaceState] = useState<string>(ANT_STATE.NOT_YET_RUN);
  const [winner, setWinner] = useState<number>(-1);
  const [username, setUserName] = useState<string>('');
  const [selectID, setSelectID] = useState<number>(-1);

  const {data, loading, error} = useListEntriesQuery({
    variables: {},
  });

  useEffect(() => {
    const getUserName = async () => {
      const u = await AsyncStorage.getItem('ANTRACE_USERNAME');
      setUserName(u || '');
    };
    getUserName();
  });

  useEffect(() => {
    if (data?.ants) {
      setAnts(
        data.ants.map((ant: Ant, id: number) => {
          return {
            id,
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
   * Prediction Select
   */
  const handleSelect = (id: number) => {
    setSelectID(id);
  };

  /**
   *
   * @param item Ant item
   */
  const renderItem = ({item}: {item: AntExpand}) => (
    <TouchableOpacity
      disabled={winner !== -1}
      onPress={() => handleSelect(item.id)}>
      <AntItem item={item} winner={winner} selected={selectID === item.id} />
    </TouchableOpacity>
  );

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
    setWinner(-1);
    setSelectID(-1);
  };

  /**
   * Calculate Odds
   */
  const calculateOdds = (currentAnts: AntExpand[]) => {
    let calculatedCount = 0;

    currentAnts.forEach((ant: AntExpand, index: number) => {
      const callback = (likelihoodOfAntWinning: number) => {
        const newAnts = [...currentAnts];
        newAnts[index].odds = likelihoodOfAntWinning;
        newAnts[index].state = ANT_STATE.CALCULATED;

        newAnts.sort((a, b) => b.odds - a.odds);

        calculatedCount++;
        if (calculatedCount === currentAnts.length) {
          let maxID = newAnts[0].id;
          let maxOdds = newAnts[0].odds;
          for (let i = 1; i < newAnts.length; i++) {
            if (maxOdds < newAnts[i].odds) {
              maxOdds = newAnts[i].odds;
              maxID = newAnts[i].id;
            }
          }
          setWinner(maxID);
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
      if (selectID === -1) {
        Alert.alert('Warning', 'Please predict a winner.');
        return;
      }
      setRaceState(ANT_STATE.IN_PROGRESS);
      startCalculating();
    } else if (raceState === ANT_STATE.CALCULATED) {
      setRaceState(ANT_STATE.NOT_YET_RUN);
      reset();
    }
  };

  /**
   * Log Out
   */
  const handleLogOut = async () => {
    await AsyncStorage.setItem('ANTRACE_USERNAME', '');
    navigation.navigate('LogIn');
  };

  /**
   * Show message
   */
  useEffect(() => {
    if (winner !== -1) {
      if (winner === selectID) {
        Alert.alert('You win!', 'Your prediction is right!');
      } else {
        Alert.alert('You failed!', 'Your prediction is wrong!');
      }
    }
  }, [winner, selectID]);

  return (
    <View style={styles.pageContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.title}>Hello {username}</Text>
          <View style={styles.logout}>
            <Button title="Logout" color={Colors.red} onPress={handleLogOut} />
          </View>
        </View>
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
        <AnimatedAntList />
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
