import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import colors from "../theme/colors";
import RoundIconBtn from "./RoundIconBtn";

const formatDate = (ms) => {
  const date = new Date(ms);
  const sec = date.getSeconds();
  const min = date.getMinutes();
  const hrs = date.getHours();
  const day = date.getDay();
  const month = date.getMonth() +1;
  const year = date.getFullYear();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetails = (props) => {
  const headerHeight = useHeaderHeight();
  const { note } = props.route.params;

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>{`Created At ${formatDate(note.time)}`}</Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={() => console.log("deleting note")}
        />
        <RoundIconBtn
          antIconName="edit"
          onPress={() => console.log("editing note")}
        />
      </View>
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
