import Vue from 'vue'
import App from './App.vue'
import Store from "./store/index"

// Стили Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/css/style.css'


new Vue({
  el: '#app',
  render: h => h(App),
  store: Store
})
