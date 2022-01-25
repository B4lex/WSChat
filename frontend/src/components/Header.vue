<template>
  <div class="container">
    <header>
      <a :href="$router.resolve({name: 'login'}).href">
        WSChat
      </a>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header > a {
  text-decoration: none;
  color: inherit;
  text-align: center;
  font-weight: 400;
  font-size: 400%;
  border-bottom: solid 1px;
}

</style>
