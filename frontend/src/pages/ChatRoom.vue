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
    this.isLoading = false
  }
}
</script>

<style scoped>

</style>
