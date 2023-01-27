import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "./axios";

export default {
  isLoggedIn() {
    const token = AsyncStorage.getItem("auth_token");
    const userID = AsyncStorage.getItem("user_id");
    return token && userID;
  },

  async getUserInfo() {
    const response = await api.get(
      `auth/users/${AsyncStorage.getItem("user_id")}/`
    );
    return response.data;
  },

  getToken() {
    return AsyncStorage.getItem("auth_token");
  },
};
