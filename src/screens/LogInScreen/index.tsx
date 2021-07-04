import React, {useState, useEffect} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './styles';

const LogInScreen = ({navigation}: any) => {
  const [run, setRun] = useState<boolean>(false);
  const [username, setUserName] = useState('');

  const handleSignIn = async () => {
    await AsyncStorage.setItem('ANTRACE_USERNAME', username);
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (run === false) {
      const getUserName = async () => {
        const u = await AsyncStorage.getItem('ANTRACE_USERNAME');
        if (u) {
          setUserName(u);
          navigation.navigate('Home');
        }
      };
      getUserName();
    }
    setRun(true);
  }, [run, navigation]);

  return (
    <View style={styles.pageContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={40}>
        <View style={styles.section}>
          <Text style={styles.title}>Welcome to Lovejet Ant-Race</Text>
          <Input
            style={styles.input}
            placeholder="UserName"
            value={username}
            onChangeText={setUserName}
          />
          {Boolean(username) && (
            <Button
              style={styles.button}
              text={'Sign In'}
              onPress={handleSignIn}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default LogInScreen;
