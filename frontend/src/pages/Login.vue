<template>
  <v-container fluid class="login">
    <Header />
    <v-card
      class="mx-auto pa-5"
      width="500"
      min-height="150"
      outlined
    >
      <v-row
        justify="center"
        align-content="center"
      >
        <v-col>
          <v-form v-model="formValid" @submit.prevent="formValid && performLogin()">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              :counter="64"
              label="Username"
              required
            ></v-text-field>
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
              v-show="submitted"
            ></v-progress-circular>
            <sign-in-button :disabled="!formValid" v-show="!submitted" />
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Header from '@/components/Header'
import SignInButton from '@/components/buttons/SignIn'

import { api } from '@/services'

export default {
  name: 'Login',
  components: {
    Header,
    SignInButton
  },
  data: () => ({
    submitted: false,
    formValid: false,
    username: '',
    usernameRules: [
      v => !!v || 'Username is required',
      v => v.length <= 64 || 'Username must be less than 64 characters'
    ]
  }),
  methods: {
    async performLogin() {
      this.submitted = true
      const response = await api.post('/auth/token/', {
        username: this.username
      })
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('user_id', response.data.user_id)
      this.$router.push({name: 'chat-room'})
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
