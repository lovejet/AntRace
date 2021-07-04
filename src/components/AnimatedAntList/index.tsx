import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, Animated, View, Easing} from 'react-native';
import AnimatedAnt from '../AnimatedAnt';

const AnimatedAntList = () => {
  const [pos1, setPos1] = useState<Animated.ValueXY>(
    new Animated.ValueXY({x: -420, y: 0}),
  );

  const moveAnt1 = useCallback(() => {
    // const {width} = Dimensions.get('window');

    let a = Animated.timing(pos1, {
      toValue: {x: 0, y: 0},
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    a.start(() => {
      setPos1(new Animated.ValueXY({x: -420, y: 0}));
    });
  }, [pos1]);

  useEffect(() => {
    moveAnt1();
  }, [moveAnt1]);

  return (
    <View style={styles.container}>
      <AnimatedAnt
        style={{
          transform: pos1.getTranslateTransform(),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    width: '100%',

    position: 'absolute',
    bottom: 10,
  },
});

export default AnimatedAntList;
