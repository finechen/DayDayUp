import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './diyRouter'
import store from './diyStore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')