import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services";
import { API_ROOT } from "../config";

export default function Login({ navigation }) {
  const [username, setUsername] = React.useState("");

  const performLogin = async () => {
    const response = await api.post(`${API_ROOT}auth/token/`, { username });
    await Promise.all([
      AsyncStorage.setItem("auth_token", response.data.token),
      AsyncStorage.setItem("user_id", response.data.user_id.toString()),
    ]);
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
      <Button title="Let's chat!" onPress={performLogin} />
      <StatusBar style="auto" />
    </View>
  );
}

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
