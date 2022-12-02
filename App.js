import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './src/screens/Home';
import Intro from './src/screens/Intro';

export default function App() {
  const [user, setUser] = useState({})
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if(result !== null){

      setUser(JSON.parse(result));
    }
  }
  useEffect(() => {
    findUser();
    // AsyncStorage.clear()
  },[]);

  if(!user.name) return <Intro onFinish={findUser}/>
  return <Home user={user}/>;
}