import { Keyboard, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../theme/colors'

const NoteInputModal = ({visible}) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const handleModalClose = () =>{
        Keyboard.dismiss();
    }

    const handleOnChangeText = (text, valueFor) =>{
        if( valueFor === 'title') setTitle(text);
        if( valueFor === 'desc') setDesc(text);

    }
    console.log(title, desc)
  return (
    <>
        <StatusBar  hidden/>
        <Modal visible={visible} animationType='fade'>
            <View style={styles.container}>
                <TextInput value={title} onChangeText={(text)=>handleOnChangeText(text, 'title')} placeholder='Title' style={[styles.input, styles.title]}/>
                <TextInput value={desc} onChangeText={(text)=>handleOnChangeText(text, 'desc')} multiline placeholder='Note' style={[styles.input, styles.desc]}/>
            </View>
            {/* <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}/>
            </TouchableWithoutFeedback> */}
        </Modal>
    </>
  )
}

export default NoteInputModal

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        paddingTop:20
    },
    input:{
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize:20,
        color:colors.DARK
    },
    title:{
        height:40,
        marginBottom:15,
        fontWeight:'bold'
    },
    desc:{
        height:100,
    },
    moveBy:{
        flex:1,
        zIndex:-1,
    }
})