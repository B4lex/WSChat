import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as React from "react";

import { auth } from "../services";

export default ({ navigation }) => {
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    if (auth.isLoggedIn()) {
      navigation.navigate("Chat");
    }
  }, []);

  const performLogin = async () => {
    await auth.authorize(username);
    navigation.navigate("Chat");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WSChat</Text>
      <TextInput
        placeholder="Enter your username"
        style={styles.usernameInput}
        onChangeText={setUsername}
      />
      <Button title="Let's chat!" disabled={!username} onPress={performLogin} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameInput: {
    backgroundColor: "white",
    minWidth: 200,
    padding: 5,
    margin: 10,
    borderRadius: 50,
  },
  heading: {
    fontSize: 40,
    fontWeight: "600",
    color: "white",
  },
});
