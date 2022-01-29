<template>
  <div>
    <Header />
    <v-container class="profile-wrapper">
      Your name is {{ userInfo.username }}!
      <div class="avatar">
        <input type="file" ref="file" @input="uploadFile" hidden />
        <a class="upload-photo" @click.prevent="$refs.file.click()">
          <div>
            <v-icon color="white" class="d-block">mdi-upload</v-icon>
            Upload your photo
          </div>
        </a>
        <img :src="userInfo.avatar" />
      </div>
      <v-progress-linear
        color="teal"
        buffer-value="0"
        v-show="isAvatarUploading"
        :value="uploadPercentage"
        stream
      />
    </v-container>
  </div>
</template>

<script>
import { auth, profile } from '@/services'
import Header from '@/components/Header.vue'

export default {
  components: { Header },
  name: 'Profile',
  data: () => ({
    userInfo: {},
    uploadPercentage: 0
  }),
  methods: {
    async uploadFile(e) {
      const response = await profile.uploadAvatar(e.target.files[0], e => {
        this.uploadPercentage = parseInt(Math.round((e.loaded / e.total) * 100))
      })
      this.userInfo.avatar = response.data.avatar
    }
  },
  async created() {
    this.userInfo = await auth.getUserInfo()
  },
  computed: {
    isAvatarUploading() {
      return this.uploadPercentage > 0 && this.uploadPercentage < 100
    }
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
  animation-fill-mode: forwards;
  animation: appear 0.3s;
}

.avatar > .upload-photo {
  color: white;
  z-index: 100;
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
