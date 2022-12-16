import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../theme/colors";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModal from "../components/NoteInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Note from "../components/Note";
import { useNotes } from "../Contexts/NoteProvider";
import NotFound from "../components/NotFound";

const reverseData = (data) => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;

  })
}

const Home = ({ user, navigation }) => {
  const [greet, setGreet] = useState("");
  const [modalVisiable, setModalVisiable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { notes, setNotes, findNotes } = useNotes();
  const [resultNotFound, setResultNotFound] = useState(false);

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  useEffect(() => {
    findGreet();
  }, []);

  const reverseNotes = reverseData(notes)

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter((note) => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findNotes();
  };

  const openNote = (note) => {
    navigation.navigate("NoteDetails", { note });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.container}>
        <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
        {notes.length ? (
          <SearchBar
            value={searchQuery}
            onChangeText={handleOnSearchInput}
            onClear={handleOnClear}
            containerStyle={{ marginVertical: 15 }}
          />
        ) : null}
        {resultNotFound ? (
          <NotFound />
        ) : (
          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 15,
            }}
            data={reverseNotes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Note onPress={() => openNote(item)} item={item} />
            )}
          />
        )}
        {!notes.length ? (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              styles.emotyHeaderContainear,
            ]}
          >
            <Text style={styles.emotyHeader}>Add Node</Text>
          </View>
        ) : null}
        <RoundIconBtn
          onPress={() => setModalVisiable(true)}
          antIconName="plus"
          style={styles.addbtn}
        />
      </View>
      </TouchableWithoutFeedback>
      <NoteInputModal
        visible={modalVisiable}
        onClose={() => setModalVisiable(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  emotyHeaderContainear: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  emotyHeader: {
    fontSize: 30,
    fontWeight: "bold",
    opacity: 0.5,
  },
  addbtn: {
    position: "absolute",
    right: 30,
    bottom: 40,
    zIndex: 1,
  },
});
