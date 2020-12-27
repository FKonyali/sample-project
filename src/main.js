import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from "vuelidate"
import i18n from './assets/js/i18n'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
