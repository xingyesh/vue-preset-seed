import Vue from 'vue'
import App from './App.vue'
import axios from './http/axios'
import router from './router'
import store from './store'
import storage from '@/assets/js/storage'
import './element-ui'

router.beforeEach((to, from, next) => {
  console.log('to is --------->', to, from)
  next()
})

Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
