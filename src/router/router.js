import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import EcografiaOstetrica from '@/pages/Ecografia-ostetrica.vue'
import VisitaGinecologica from '@/pages/Visita-ginecologica.vue'
import VisitaOstetrica from '@/pages/Visita-ostetrica.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/ecografia-ostetrica', component: EcografiaOstetrica },
  { path: '/visita-ginecologica', component: VisitaGinecologica },
  { path: '/visita-ostetrica', component: VisitaOstetrica },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
