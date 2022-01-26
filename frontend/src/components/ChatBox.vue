<template>
  <div class="chat-wrapper">
    <div class="chat-body" ref="chatBody">
      <message
        :message="message"
        v-for="message in messages"
        :key="message.id"
      />
    </div>
    <div class="bottom-bar">
      <v-text-field
        outlined
        v-model="message"
        label="Write your message"
        color="white"
        dark
        @keypress.enter="sendMessage"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Message from '@/components/Message.vue'

import { auth, api, ChatWebSocketMixin } from '@/services'

export default {
  name: 'ChatBox',
  components: {
    Header,
    Message
  },
  mixins: [ChatWebSocketMixin],
  data: () => ({
    message: '',
    userInfo: {},
    messages: []
  }),
  methods: {
    handleNewMessage(message) {
      this.messages.push(message)
      this.$nextTick(this.scrollToLatest)
    },
    sendMessage(e) {
      this.sendMessageByWebSocket({
        content: this.message,
        sender_id: this.userInfo.id
      })
      this.message = ''
    },
    async fetchMessages() {
      const response = await api.get('chat/messages/')
      return response.data
    },
    scrollToLatest() {
      this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight
    }
  },
  async created() {
    this.initWS()
    this.userInfo = await auth.getUserInfo()
    this.messages = await this.fetchMessages()
    this.$emit('initialized')
    this.$nextTick(this.scrollToLatest)
  }
}
</script>

<style>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 700px;
  height: 700px;
  color: white;
  border-radius: 10px;
  margin: 2rem auto;
  padding: 2rem;
  background-color:rgba(0, 20, 0, 0.8);
}

.chat-body {
  overflow-y: scroll;
  margin-bottom:0.8rem;
  border-radius: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chat-body::-webkit-scrollbar {
  display: none;
}
</style>
