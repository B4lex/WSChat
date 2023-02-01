import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";

import MessageTile from "../ components/MessageTile";
import { auth, messageAPI } from "../services";
import ChatWS from "../services/chat";

const chatWS = new ChatWS();

export default ({ navigation }) => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState(null);

  const chatFlowScroll = React.useRef();

  const scrollToBottom = React.useCallback(() => {
    if (messages.length) {
      chatFlowScroll.current.scrollToIndex({
        index: messages.length - 1,
        animated: true,
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message) {
      chatWS.sendChatMessage({
        content: message,
        sender_id: userInfo.id,
      });
      setMessages([
        ...messages,
        {
          content: message,
          sender: userInfo,
        },
      ]);
      setMessage("");
    }
  };

  const computeMessageTileLayout = React.useCallback((messagesList, index) => {
    const messageContent = messagesList[index].content;
    const tileHeight = 20 + Math.floor(messageContent.length / 30) * 16;
    return {
      length: tileHeight,
      offset: tileHeight * index,
      index,
    };
  });

  const handleIncomingMessage = (message) => {
    if (message.sender.id !== userInfo.id) {
      setMessages([...messages, message]);
    }
  };

  chatWS.on("message", handleIncomingMessage);

  React.useEffect(() => {
    (async function () {
      await chatWS.init();
      setUserInfo(await auth.getUserInfo());
      setMessages(await messageAPI.fetchMessages());
    })();
  }, []);

  React.useEffect(scrollToBottom, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.chatHeading}>
        WSChat ({userInfo && userInfo.username})
      </Text>
      <View style={styles.chatBox}>
        <FlatList
          ref={chatFlowScroll}
          keyboardShouldPersistTaps="handled"
          data={messages}
          getItemLayout={computeMessageTileLayout}
          renderItem={({ item, index }) => (
            <MessageTile userInfo={userInfo} message={item} key={index} />
          )}
          style={styles.chatFlow}
        />
        <View style={styles.bottomBox}>
          <TextInput
            style={styles.chatInput}
            value={message}
            onChangeText={setMessage}
          />
          <Pressable style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    height: "100%",
    padding: 15,
  },
  chatHeading: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  chatBox: {
    justifyContent: "flex-end",
    backgroundColor: "white",
    height: "90%",
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    padding: 5,
  },
  chatInput: {
    color: "#f6f5f7",
    backgroundColor: "#8078cf",
    borderRadius: 5,
    marginVertical: 5,
    height: 50,
    fontSize: 14,
    padding: 5,
    flex: 1,
  },
  chatFlow: {
    flex: 1,
  },
  bottomBox: {
    flexDirection: "row",
    paddingTop: 5,
  },
  sendButton: {
    backgroundColor: "#8078cf",
    height: 50,
    width: 50,
    borderRadius: 50,
    paddingHorizontal: 7,
    marginLeft: 5,
  },
  sendButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 50,
  },
});
