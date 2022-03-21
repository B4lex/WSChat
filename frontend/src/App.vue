<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

#app {
  font-weight: 2345100;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(20, 34, 36);
  background-color: rgb(243, 231, 231);
  background-image: url("assets/images/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
