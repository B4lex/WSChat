<template>
  <div class="chat-wrapper">
    <div class="chat-body" ref="chatBody">
      <message
        :message="message"
        v-for="message in messages"
        :key="message.id"
      />
    </div>
    <div class="typers">
      <span v-show="formatedTypers">{{ formatedTypers }} Набирает сообщение...</span>
    </div>
    <div class="bottom-bar">
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
    typers: []
  }),
  methods: {
    handleNewMessage(message) {
      this.messages.push(message)
      this.$nextTick(this.scrollToLatest)
    },
    handleTyping(userData) {
      this.typers.push(userData)
      setTimeout(() => {
        this.typers.splice(
          this.typers.indexOf(
            this.typers.find(typer => typer.id === userData.id)
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
    formatedTypers() {
      console.log(this.typers.filter(typer => typer.id !== this.userID))
      return [...new Set(
        this.typers.filter(typer => typer.id !== this.userID).map(typer => typer.username)
      )].join(', ')
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
  min-height: 1rem;
  margin-bottom: 0.8rem;
}
</style>
