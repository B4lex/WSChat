<template>
  <div class="chat-room-wrapper">
    <Header />
    <div class="mb-5">Welcome,
      <router-link to="/profile">{{ userInfo.username }}</router-link>,
      to the chat room!
    </div>
    <v-skeleton-loader
      type="article, article, article, article,actions"
      v-show="isLoading"
      class="skeleton"
      max-width="800"
    ></v-skeleton-loader>
    <div v-show="!isLoading">
      <chat-box @initialized="isLoading = false" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import ChatBox from '@/components/ChatBox.vue'

import { auth } from '@/services'

export default {
  name: 'ChatRoom',
  components: {
    Header,
    ChatBox
  },
  data: () => ({
    isLoading: true,
    userInfo: {}
  }),
  async created() {
    this.userInfo = await auth.getUserInfo()
  }
}
</script>

<style scoped>
.chat-room-wrapper {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 10px;
}
</style>
