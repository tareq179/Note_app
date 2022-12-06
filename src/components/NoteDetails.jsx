import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useState } from "react";
import colors from "../theme/colors";
import RoundIconBtn from "./RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../Contexts/NoteProvider";
import NoteInputModal from "./NoteInputModal";

const formatDate = (ms) => {
  const date = new Date(ms);
  const sec = date.getSeconds();
  const min = date.getMinutes();
  const hrs = date.getHours();
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetails = (props) => {
  const headerHeight = useHeaderHeight();
  const [note, setNote] = useState(props.route.params.note);
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes)
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Delete",
        onPress: deleteNote,
        style: "cancel",
      },
      { text: "No Thanks", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const handleOnClose = () =>setShowModal(false)

  const handleUpdate = async(title, desc, time) => {
    const result = await AsyncStorage.getItem('notes')
    let notes = [];
    if (result !== null) notes = JSON.parse(result)
    
    const newNotes= notes.filter(n => {
      if (n.id === note.id) {
        n.title = title
        n.desc = desc
        n.isUpdated = true
        n.time = time

        setNote(n)
      }
      return n;
    })
    setNotes(newNotes)
    await AsyncStorage.setItem('notes',JSON.stringify(newNotes))
  }

  const openEditModal = () => {
    setShowModal(true)
    setIsEdit(true)
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>
          {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn antIconName="edit" onPress={openEditModal} />
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});
