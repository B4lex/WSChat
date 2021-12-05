<template>
  <div>
    <Header />
    <v-progress-circular
      indeterminate
      color="green"
      v-show="isLoading"
    ></v-progress-circular>
    <div v-show="!isLoading">
      <div>
        Welcome, {{ userInfo.username }}, to chat room!
      </div>
      <div class="chat-wrapper">
        <message
          :message="message"
          v-for="message in messages"
          :key="message.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Message from '../components/Message.vue'

import { auth, api } from '@/services'

export default {
  name: 'ChatRoom',
  components: {
    Header,
    Message
  },
  data: () => ({
    userInfo: {},
    messages: [],
    isLoading: true
  }),
  methods: {
    async fetchMessages() {
      const response = await api.get('chat/messages/')
      return response.data
    }
  },
  async mounted() {
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
  width: 500px;
  height: 500px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 2rem auto;
}
</style>
