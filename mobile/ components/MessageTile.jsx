import { View, Text, StyleSheet } from "react-native";

export default ({ message, userInfo }) => {
  return (
    <View
      style={[
        styles.tile,
        {
          alignSelf:
            userInfo.id == message.sender.id ? "flex-end" : "flex-start",
        },
      ]}
    >
      <Text style={styles.tileText}>{message.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#8078cf",
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  tileText: {
    color: "white",
    fontSize: 16,
  },
});
