import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vuedraggable from 'vuedraggable'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(BootstrapVue)
Vue.use(vuedraggable)
Vue.use(VueSweetalert2)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
