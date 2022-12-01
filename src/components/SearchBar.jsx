import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../theme/colors'

const SearchBar = () => {
  return (
    <View>
      <TextInput style={styles.searchBar} placeholder='Search hear...'/>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar:{
        borderWidth:0.5,
        borderColor:colors.PRIMARY,
        height:40,
        borderRadius:40,
        paddingLeft:15,
        fontSize:20
    }
})