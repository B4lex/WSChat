<template>
  <div>
    <Header />
    <v-container class="profile-wrapper">
      Your name is {{ userInfo.username }}!
      <img :src="userInfo.avatar" />
    </v-container>
  </div>
</template>

<script>
import { auth } from '@/services'
import Header from '@/components/Header.vue'

export default {
  components: { Header },
  name: 'Profile',
  data: () => ({
    userInfo: {}
  }),
  async created() {
    this.userInfo = await auth.getUserInfo()
  }
}
</script>

<style scoped>
.profile-wrapper {
  background-color: rgba(1, 1, 1, 0.2);
  border-radius: 10px;
  color: white;
}
.profile-wrapper img {
  display: block;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: black 2px solid;
  margin: 2rem auto;
}
</style>
