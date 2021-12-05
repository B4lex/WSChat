<template>
  <div>
    <Header />
    <v-progress-circular
      indeterminate
      color="green"
      v-show="isLoading"
    ></v-progress-circular>
    <div v-show="!isLoading">
      <div>Welcome, {{ userInfo.username }}, to the chat room!</div>
      <div class="chat-wrapper">
        <div>
          <message
            :message="message"
            v-for="message in messages.slice(Math.max(messages.length - 15, 0))"
            :key="message.id"
          />
        </div>
        <div class="bottom-bar">
          <v-text-field
            label="Write your message"
            @keypress.enter="sendMessage"
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Message from '@/components/Message.vue'

import { auth, api, ChatWebSocketMixin } from '@/services'

export default {
  name: 'ChatRoom',
  components: {
    Header,
    Message
  },
  mixins: [ChatWebSocketMixin],
  data: () => ({
    userInfo: {},
    messages: [],
    isLoading: true
  }),
  methods: {
    handleNewMessage(message) {
      this.messages.push(message)
    },
    sendMessage(e) {
      console.log(e)
      this.sendMessageByWebSocket({
        content: e.target.value,
        sender_id: this.userInfo.id
      })
      e.target.value = ''
    },
    async fetchMessages() {
      const response = await api.get('chat/messages/')
      return response.data
    }
  },
  async created() {
    this.initWS()
    this.userInfo = await auth.getUserInfo()
    this.messages = await this.fetchMessages()
    setTimeout(() => {
      this.isLoading = false
    }, 500)
  }
}
</script>

<style scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 500px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 2rem auto;
  padding: 2rem;
}
</style>
