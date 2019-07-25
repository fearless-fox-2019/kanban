import Vue from 'vue';
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSweetalert2 from 'vue-sweetalert2'
import Vuedraggable from 'vuedraggable'
import App from './App.vue';
 
Vue.use(VueSweetalert2);
Vue.use(Vuedraggable)
Vue.use(vuetify)

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
