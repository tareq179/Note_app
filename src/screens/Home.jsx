import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../theme/colors'
import SearchBar from '../components/SearchBar'
import RoundIconBtn from '../components/RoundIconBtn'
import NoteInputModal from '../components/NoteInputModal'

const Home = ({user}) => {
  const [greet, setGreet] = useState('')
  const [modalVisiable, setModalVisiable] = useState(false)

  const findGreet = ()=>{
    const hrs = new Date().getHours();
    if(hrs === 0 || hrs <12) return setGreet('Morning');
    if(hrs === 1 || hrs <17) return setGreet('Afternoon');
    setGreet('Evening');
  }
  useEffect(() => {
    findGreet();
  }, [])

  const handleOnSubmit = (title, desc) =>{
    console.log(title, desc);
  }
  
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT}/>
      <View style={styles.container}>
      <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
      <SearchBar containerStyle={{marginVertical:15}}/>
      <View style={[StyleSheet.absoluteFillObject ,styles.emotyHeaderContainear]}>
        <Text style={styles.emotyHeader}>Add Node</Text>
        <RoundIconBtn onPress={()=>setModalVisiable(true)} antIconName='plus' style={styles.addbtn}/>
      </View>
      </View>
      <NoteInputModal visible={modalVisiable} onClose={() => setModalVisiable(false)} onSubmit={handleOnSubmit}/>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:20,
    flex:1
  },
  header:{
    fontSize:25,
    fontWeight:'bold',
    textTransform:'capitalize'
  },
  emotyHeaderContainear:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    zIndex:-1
  },
  emotyHeader:{
    fontSize:30,
    fontWeight:'bold',
    opacity:.5
  },
  addbtn:{
    position:'absolute',
    right:30,
    bottom:40
  }
})