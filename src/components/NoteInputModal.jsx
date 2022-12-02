import { Keyboard, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../theme/colors'
import RoundIconBtn from '../components/RoundIconBtn'


const NoteInputModal = ({visible, onClose, onSubmit}) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const handleModalClose = () =>{
        Keyboard.dismiss();
    }

    const handleOnChangeText = (text, valueFor) =>{
        if( valueFor === 'title') setTitle(text);
        if( valueFor === 'desc') setDesc(text);

    }
    
    const handleSubmit = () => {
        if(!title.trim() && !desc.trim()) return onClose();
        onSubmit(title, desc);
        setTitle('');
        setDesc('');
        onClose()
    }
    const handleClose = () => {
        setTitle('');
        setDesc('');
        onClose()
    }

  return (
    <>
        <StatusBar  hidden/>
        <Modal visible={visible} animationType='fade'>
            <View style={styles.container}>
                <TextInput value={title} onChangeText={(text)=>handleOnChangeText(text, 'title')} placeholder='Title' style={[styles.input, styles.title]}/>
                <TextInput value={desc} onChangeText={(text)=>handleOnChangeText(text, 'desc')} multiline placeholder='Note' style={[styles.input, styles.desc]}/>
                <View style={styles.btnContainer}>    
                    <RoundIconBtn size={15} antIconName='check' onPress={handleSubmit}/>
                    {title.trim() || desc.trim() ? (<RoundIconBtn size={15} style={{marginLeft:15}} antIconName='close' onPress={handleClose}/>) : null}
                </View>
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
        fontWeight:'bold',
        paddingLeft:15,
    },
    desc:{
        height:100,
        paddingLeft:15,
    },
    moveBy:{
        flex:1,
        zIndex:-1,
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:15
    }
})