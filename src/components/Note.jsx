import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../theme/colors';

const Note = ({ item, onPress}) => {
    const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text numberOfLines={2} style={styles.title}>{title}</Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  )
}

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.LIGHT,
        textTransform:'capitalize'
  }
});

export default Note;