import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default ({ message, userInfo }) => {
  const isSelf = React.useMemo(() => userInfo.id === message.sender.id);

  return (
    <View
      style={[
        styles.tile,
        {
          alignSelf: isSelf ? "flex-end" : "flex-start",
          [isSelf ? "marginLeft" : "marginRight"]: "20%",
        },
      ]}
    >
      <Text>{message.sender.username}:</Text>
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
