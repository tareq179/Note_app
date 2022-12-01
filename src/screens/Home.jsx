import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../theme/colors'
import SearchBar from '../components/SearchBar'

const Home = ({user}) => {
  const [greet, setGreet] = useState('')

  const findGreet = ()=>{
    const hrs = new Date().getHours();
    if(hrs === 0 || hrs <12) return setGreet('Morning');
    if(hrs === 1 || hrs <17) return setGreet('Afternoon');
    setGreet('Evening');
  }
  useEffect(() => {
    findGreet();
  }, [])
  
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT}/>
      <View style={styles.container}>
      <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
      <SearchBar/>
      </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:20,
  },
  header:{
    fontSize:25,
    fontWeight:'bold',
    textTransform:'capitalize'
  }
})