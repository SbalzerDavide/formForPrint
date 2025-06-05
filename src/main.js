import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
// import './dayjs.min.js'
// import './percentile.js'
// import './uterineVal.js'
import App from './App.vue'

import NormalDistribution from 'normal-distribution';
window.NormalDistribution = NormalDistribution;

import Home from './pages/Home.vue'
import Form from './pages/Form.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

const routes = [
  { path: '/', component: Home },
  { path: '/ciao', component: Form },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app');
