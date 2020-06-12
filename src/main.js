// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import Axios from 'axios'
import vuetify from '@/plugins/vuetify'

Vue.prototype.$http = Axios
const token = localStorage.getItem('token')
console.log(token)
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Token ' + token
}
Vue.prototype.$http.defaults.baseURL = 'http://127.0.0.1:8000/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
})
