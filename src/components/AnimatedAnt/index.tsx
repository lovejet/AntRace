import React from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import {AntSvg} from '../svg';

const AnimatedAnt = ({style}: {style: any}) => {
  return (
    <Animated.View style={[styles.progress, style]}>
      <View style={styles.ant}>
        <AntSvg width={40} height={40} color={'red'} />
      </View>
      <View style={styles.ant}>
        <AntSvg width={40} height={40} color={'green'} />
      </View>
      <View style={styles.ant}>
        <AntSvg width={40} height={40} color={'blue'} />
      </View>
      <View style={styles.ant}>
        <AntSvg width={40} height={40} color={'red'} />
      </View>
      <View style={styles.ant}>
        <AntSvg width={40} height={40} color={'green'} />
      </View>
      <View style={styles.ant}>
        <AntSvg width={40} height={40} color={'blue'} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  progress: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    width: '100%',
  },
  ant: {
    marginRight: 100,
  },
});

export default AnimatedAnt;
