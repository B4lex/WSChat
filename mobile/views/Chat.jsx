import * as React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ navigation }) => {
  const [authToken, setAuthToken] = React.useState(null);
  const [userId, setUserId] = React.useState(null);

  AsyncStorage.getItem("auth_token").then(setAuthToken);
  AsyncStorage.getItem("user_id").then(setUserId);

  return (
    <View style={styles.container}>
      <Text style={styles.chatHeading}>Chat</Text>
      <Text>Token: {authToken}</Text>
      <Text>Your User ID: {userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    flex: 1,
    alignItems: "center",
    paddingVertical: 30,
  },
  chatHeading: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
});
