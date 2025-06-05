import { createApp } from 'vue'
import { router } from './router/router.js'
import './style.css'
// import './dayjs.min.js'
// import './percentile.js'
// import './uterineVal.js'
import App from './App.vue'

import NormalDistribution from 'normal-distribution';
window.NormalDistribution = NormalDistribution;

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

createApp(App)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app');
