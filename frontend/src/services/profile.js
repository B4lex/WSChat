import { api } from '@/services'

export default {
  async uploadAvatar(file, uploadProgressHandler) {
    const formData = new FormData()
    formData.set('avatar', file)
    const response = await api.patch(
      `auth/users/${localStorage.getItem('user_id')}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: uploadProgressHandler
      }
    )
    return response
  }
}
