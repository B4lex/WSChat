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
      <div class="typers">
        <span v-show="typers.length">
          {{ formatedTypers }} {{ typers.length > 1 ? 'are' : 'is' }} typing...
        </span>
      </div>
      <v-text-field
        outlined
        v-model="message"
        label="Write your message"
        color="#45ff86"
        dark
        @input="sendTyping(userID)"
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
    messages: [],
    typingEvents: []
  }),
  methods: {
    handleNewMessage(message) {
      this.messages.push(message)
      this.$nextTick(this.scrollToLatest)
    },
    handleTyping(userData) {
      this.typingEvents.push(userData)
      setTimeout(() => {
        this.typingEvents.splice(
          this.typingEvents.indexOf(
            this.typingEvents.find(typer => typer.id === userData.id)
          ),
          1
        )
      }, 5000)
    },
    sendMessage(e) {
      this.sendChatMessage({
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
  computed: {
    userID() {
      return +localStorage.getItem('user_id')
    },
    typers() {
      return [...new Set(
        this.typingEvents.filter(typer => typer.id !== this.userID).map(typer => typer.username)
      )]
    },
    formatedTypers() {
      return this.typers.join(', ')
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
  height: 670px;
  color: white;
  border-radius: 10px;
  padding: 1rem;
  background-color:rgba(0, 20, 0, 0.8);
  margin: 0 1rem;
}

.chat-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chat-body::-webkit-scrollbar {
  display: none;
}

.typers {
  min-height: 1.2rem;
  line-height: 1.2rem;
  margin-bottom: .2rem;
  font-size: 90%;
}

.bottom-bar {
  padding: .2rem 1rem;
  background-color: rgba(0, 50, 50, 0.4);
  border-radius: 10px;
}
</style>
