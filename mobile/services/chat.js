import { WEBSOCKET_ROOT } from "../config";
import auth from "./auth";

export default class {
  _eventHandlers = {};

  async init() {
    this._ws = new WebSocket(
      `${WEBSOCKET_ROOT}chat/?token=${await auth.getToken()}`
    );

    this._ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      const handler = this._eventHandlers[message.type];
      if (handler) {
        handler(message.data);
      }
    };

    this._ws.onerror = (e) => {
      console.error(e);
    };
  }

  on(eventType, handler) {
    this._eventHandlers[eventType] = handler;
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

  _sendMessageByWebSocket(message) {
    this._ws.send(JSON.stringify(message));
  }
}
