<template>
  <div :class="['message-wrapper', message.sender.id == currentUserID ? 'own' : 'opponent']">
      <img src="@/assets/logo.png" alt="Avatar" class="right">
      <div class="message-box gradient">
        <div class="sender" v-show="message.sender.id != currentUserID">{{ message.sender.username }}:</div>
        <div class="content">{{ message.content }}</div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Message',
  props: {
    message: Object
  },
  computed: {
    currentUserID() {
      return localStorage.getItem('user_id')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.message-wrapper {
  display: flex;
}

.message-box {
  font-family: 'Montserrat', sans-serif;
  padding: 1rem;
  text-align: left;
  flex-shrink: 0;
  min-height: 1.5rem;
  max-width: 75%;
  border-radius: 20px;
  margin-bottom: 0.5rem;
}

.message-box > .sender {
  word-break: keep-all;
  color: #9df0f2;
  font-weight: 800;
  font-size: .8rem;
  opacity: .8;
}

.own {
  text-align: right;
  align-self: end;
  flex-direction: row-reverse;
}

.opponent {
  text-align: left;
  align-self: flex-start;
}

.own > .gradient {
  background: rgb(137,34,186);
  background: linear-gradient(159deg, rgba(137,34,186,1) 6%, rgba(91,55,194,1) 22%, rgba(101,26,184,1) 36%, rgba(105,27,198,1) 54%, rgba(126,39,204,1) 69%, rgba(121,84,184,1) 83%, rgba(162,77,203,1) 95%);
}

.opponent > .gradient {
  background: rgb(27,35,156);
  background: linear-gradient(163deg, rgba(27,35,156,1) 0%, rgba(57,45,133,1) 22%, rgba(51,59,152,1) 38%, rgba(25,62,145,1) 51%, rgba(61,32,152,1) 76%, rgba(55,13,157,1) 100%);
}

.message-wrapper > img {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.break-everything {
  word-break: break-all;
}
</style>
