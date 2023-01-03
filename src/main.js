import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import NormalDistribution from 'normal-distribution';
console.log(NormalDistribution);
window.NormalDistribution = NormalDistribution;
createApp(App).mount('#app');
