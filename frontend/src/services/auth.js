import { api } from '@/services'

export default {
  isLoggedIn() {
    const token = localStorage.getItem('auth_token')
    const userID = localStorage.getItem('user_id')
    return (
      token !== undefined &&
      token !== null &&
      userID !== undefined &&
      userID !== null
    )
  },

  async getUserInfo() {
    const response = await api.get(
      `auth/users/${localStorage.getItem('user_id')}/`
    )
    return response.data
  },

  getAuthHeaders() {
    const token = localStorage.getItem('auth_token')
    return { Authorization: `Bearer ${token}` }
  }
}
