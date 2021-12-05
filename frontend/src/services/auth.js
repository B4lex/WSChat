import { api } from '@/services'

export default {
  isLoggedIn() {
    const token = localStorage.getItem('auth_token')

    return token !== undefined && token !== null
  },

  async getUserInfo() {
    const token = localStorage.getItem('auth_token')
    const response = await api.get('auth/user/', {token})
    return response.data
  }
}
