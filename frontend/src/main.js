import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  vuetify
})
