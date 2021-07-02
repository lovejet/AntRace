import React from 'react';
import {View, StatusBar} from 'react-native';

import AppNavigator from './app-navigator';

import styles from './styles';

const RootContainer = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </View>
  );
};

export default RootContainer;
