<template>
  <div>
    {{ message.sender.username }}: {{ message.content }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object
  }
}
</script>
