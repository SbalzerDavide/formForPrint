import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import NormalDistribution from 'normal-distribution';
window.NormalDistribution = NormalDistribution;
createApp(App).mount('#app');
