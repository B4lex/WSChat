import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "./axios";

export default {
  async authorize(username) {
    const response = await api.post("auth/token/", { username });
    await Promise.all([
      await AsyncStorage.setItem("auth_token", response.data.token),
      await AsyncStorage.setItem("user_id", response.data.user_id.toString()),
    ]);
  },

  async isLoggedIn() {
    const token = await AsyncStorage.getItem("auth_token");
    const userID = await AsyncStorage.getItem("user_id");
    return token && userID;
  },

  async getUserInfo() {
    const response = await api.get(
      `auth/users/${await AsyncStorage.getItem("user_id")}/`
    );
    return response.data;
  },

  async getToken() {
    return await AsyncStorage.getItem("auth_token");
  },
};
