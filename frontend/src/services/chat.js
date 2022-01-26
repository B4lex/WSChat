import { WEBSOCKET_ROOT } from '@/config'
import { auth } from '@/services'

// Chat WebSocket mixin
export default {
  data: () => ({
    wsInstance: null
  }),
  methods: {
    initWS() {
      this.wsInstance = new WebSocket(
        `${WEBSOCKET_ROOT}ws/chat/?token=${auth.getToken()}`
      )
      this.wsInstance.onmessage = e => {
        const message = JSON.parse(e.data)
        if (message.type === 'message' && this.handleNewMessage) {
          this.handleNewMessage(message.data) // Invokes onmessage handler
        } else if (message.type === 'typing' && this.handleTyping) {
          this.handleTyping(message.data)
        }
      }
    },
    _sendMessageByWebSocket(message) {
      if (this.wsInstance) {
        this.wsInstance.send(
          JSON.stringify(message)
        )
      } else {
        console.error("WebSocket instance hasn't been initialized.")
      }
    },
    sendChatMessage(messageData) {
      this._sendMessageByWebSocket({
        type: 'message',
        data: messageData
      })
    },
    sendTyping(userID) {
      this._sendMessageByWebSocket({
        type: 'typing',
        data: {user_id: userID}
      })
    }
  }
}
