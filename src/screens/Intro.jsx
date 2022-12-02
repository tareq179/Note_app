import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import colors  from '../theme/colors'
import RoundIconBtn from '../components/RoundIconBtn';

const Intro = ({onFinish}) => {
  const [name, setName] = useState('');
  const hendleOnChangeText = text => setName(text);
  const hendleSubmit = async () =>{
    const user = {name:name }
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if(onFinish) onFinish();
  }
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.inputTitle}>Enter Your Name to Containye</Text>
      <TextInput value={name} onChangeText={hendleOnChangeText} placeholder='Enter Name' style={styles.textInput}/>
    {
      name.trim().length >= 3 ? 
      <RoundIconBtn antIconName='arrowright' onPress={hendleSubmit}/> : null
    }
    </View>
    </>
  )
}

export default Intro

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    textInput:{
      borderWidth:2,
      borderColor: colors.PRIMARY,
      color: colors.PRIMARY,
      width,
      height:50,
      borderRadius:10,
      paddingLeft: 15,
      fontSize: 25,
      marginBottom:15,
    },
    inputTitle:{
      alignSelf:'flex-start',
      paddingLeft:25,
      marginBottom:5,
      opacity:0.5,
    }
    
})