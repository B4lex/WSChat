<template>
  <div>
    <Header />
    <v-container class="profile-wrapper">
      Your name is {{ userInfo.username }}!
      <div class="avatar">
        <a class="upload-photo">
          <div>
            <v-icon color="white" class="d-block">mdi-upload</v-icon>
            Upload your photo
          </div>
        </a>
        <img :src="userInfo.avatar">
      </div>
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
  box-sizing: content-box;
  background-color: rgba(1, 1, 1, 0.2);
  border-radius: 10px;
  color: white;
  z-index: 1;
}
.avatar {
  margin: 2rem auto;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: black 2px solid;
}

.avatar > img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.avatar:hover > img {
  transition: filter 1s;
  filter: blur(10px);
}

.avatar:hover > .upload-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: upload 1s;
  animation-fill-mode: forwards;
  animation: appear 1s;
}

.avatar > .upload-photo {
  color: white;
  z-index: 1000;
  display: none;
  position: absolute;
  text-align: center;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
}

@keyframes appear {
  0% {
    background: rgba(0, 0, 0, 0);
  }
}
</style>
