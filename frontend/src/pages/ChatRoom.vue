<template>
  <div>
    <Header />
    <v-progress-circular
      indeterminate
      color="green"
      v-show="isLoading"
    ></v-progress-circular>
    <div v-show="!isLoading">
      Welcome, {{ userInfo.username }}, to chat room!
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { auth } from '@/services'

export default {
  name: 'ChatRoom',
  components: { Header },
  data: () => ({
    userInfo: {},
    isLoading: true
  }),
  async mounted() {
    this.userInfo = await auth.getUserInfo()
    setTimeout(() => { this.isLoading = false }, 500)
  }
}
</script>
