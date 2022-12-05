import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./src/screens/Home";
import Intro from "./src/screens/Intro";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteDetails from "./src/components/NoteDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };
  useEffect(() => {
    findUser();
    // AsyncStorage.clear()
  }, []);

  const renderNoteScreen = (props) => <Home {...props} user={user} />;

  if (!user.name) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitle:'', headerTransparent:true}}>
        <Stack.Screen name="Note" component={renderNoteScreen} />
        <Stack.Screen name="NoteDetails" component={NoteDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
