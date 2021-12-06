const WEBSOCKET_ROOT = process.env.WEBSOCKET_ROOT || null

// Chat WebSocket mixin
export default {
  data: () => ({
    wsInstance: null
  }),
  methods: {
    initWS() {
      this.wsInstance = new WebSocket(`${WEBSOCKET_ROOT}ws/chat/`)
      this.wsInstance.onmessage = e => {
        const message = JSON.parse(e.data)
        console.log(message)
        if (this.handleNewMessage) {
          this.handleNewMessage(message) // Invokes onmessage handler
        }
      }
    },
    sendMessageByWebSocket(messageData) {
      if (this.wsInstance) {
        this.wsInstance.send(
          JSON.stringify(messageData)
        )
      } else {
        console.error("WebSocket instance hasn't been initialized.")
      }
    }
  }
}