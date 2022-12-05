import { StyleSheet, Text, View } from 'react-native'
import { useHeaderHeight } from "@react-navigation/elements";
import React from 'react'

const NoteDetails = (props) => {
  const headerHeight = useHeaderHeight()
  const { note } = props.route.params;
  return (
    <View style={{paddingTop:headerHeight}}>
      <Text>{note.title}</Text>
      <Text>{note.desc}</Text>
    </View>
  )
}

export default NoteDetails

const styles = StyleSheet.create({})