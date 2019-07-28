import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import BootstrapVue from 'bootstrap-vue'
import 'firebase/firestore'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

const config = {
  apiKey: process.env.VUE_APP_API_KEY_FIREBASE,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN_FIREBASE,
  projectId: process.env.VUE_APP_PROJECT_ID_FIREBASE
}

firebase.initializeApp(config)

const db = firebase.firestore()

export default db

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
