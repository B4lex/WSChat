import api from "./axios";

export default {
  async fetchMessages() {
    return (await api.get("chat/messages/")).data;
  },
};
