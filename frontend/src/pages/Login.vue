<template>
  <div>
    <Header />
    <v-form v-model="formValid">
      <v-container>
        <v-row align="center" justify="space-around">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              :counter="64"
              label="Username"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-btn
            tile
            :disabled="!formValid"
            color="success"
            @click.prevent="formValid && performLogin()"
          >
            Sign In
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Header from '@/components/Header'

import { api } from '@/services'

export default {
  name: 'Login',
  components: { Header },
  data: () => ({
    formValid: false,
    username: '',
    usernameRules: [
      v => !!v || 'Username is required',
      v => v.length <= 64 || 'Username must be less than 64 characters'
    ]
  }),
  methods: {
    async performLogin() {
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
