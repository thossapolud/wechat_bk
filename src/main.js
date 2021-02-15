import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase";
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import VueCookies from 'vue-cookies'
// import VueFire from 'vuefire'
// import { firestorePlugin } from 'vuefire'

// Vue.use(firestorePlugin)
Vue.use(VueCookies)
Vue.config.productionTip = false
// Vue.$cookies.config('7d')
// Vue.use(VueFire)
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBR0kstVOmbMCE6WuaSiXImg5hCAcTpowM",
  authDomain: "messages-d18e7.firebaseapp.com",
  databaseURL: "https://messages-d18e7-default-rtdb.firebaseio.com",
  projectId: "messages-d18e7",
  storageBucket: "messages-d18e7.appspot.com",
  messagingSenderId: "344571973812",
  appId: "1:344571973812:web:606441221459ed5fa787e1",
  measurementId: "G-MXKDDZHQ2X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

window.db= db;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
