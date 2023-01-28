import { WEBSOCKET_ROOT } from "../config";
import auth from "./auth";

export default class ChatAPI {
  async init(onNewMessage, onTyping) {
    this._ws = new WebSocket(
      `${WEBSOCKET_ROOT}chat/?token=${await auth.getToken()}`
    );
    this._ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.type === "message" && onNewMessage) {
        onNewMessage(message.data); // Invokes onmessage handler
      } else if (message.type === "typing" && onTyping) {
        onTyping(message.data);
      }
    };
    this._ws.onerror = (e) => {
      console.error(e);
    };
  }

  _sendMessageByWebSocket(message) {
    this._ws.send(JSON.stringify(message));
  }

  sendChatMessage(messageData) {
    this._sendMessageByWebSocket({
      type: "message",
      data: messageData,
    });
  }

  sendTyping(userID) {
    this._sendMessageByWebSocket({
      type: "typing",
      data: { user_id: userID },
    });
  }
}
