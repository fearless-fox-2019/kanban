import Vue from 'vue';
import firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue';
import VueDragDrop from 'vue-drag-drop';


import 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';
import App from './App.vue';

library.add(faTrash);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueDragDrop);
Vue.use(BootstrapVue);

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
});

export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
