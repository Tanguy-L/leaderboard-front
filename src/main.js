import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

Vue.config.productionTip = false

new Vue({
  Axios,
  render: h => h(App)
}).$mount('#app')
