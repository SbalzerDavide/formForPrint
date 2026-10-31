import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import EcografiaOstetrica from '@/pages/Ecografia-ostetrica.vue'
import VisitaGinecologica from '@/pages/Visita-ginecologica.vue'
import VisitaOstetrica from '@/pages/Visita-ostetrica.vue'
import Visit from '@/pages/Visit.vue'
import Print from '@/pages/Print.vue'
import Patients from '@/pages/Patients.vue'
import Settings from '@/pages/Settings.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/pazienti', name: 'Pazienti', component: Patients },
  { path: '/pazienti/:patientId(\\d+)', name: 'Paziente', component: Patients, props: true },
  { path: '/impostazioni', name: 'Impostazioni', component: Settings },
  {
    path: '/visita', name: 'Visita', component: Visit, children: [
      { path: 'ecografia-ostetrica', name: 'EcografiaOstetrica', component: EcografiaOstetrica },
      { path: 'visita-ginecologica', name: 'VisitaGinecologica', component: VisitaGinecologica },
      { path: 'visita-ostetrica', name: 'VisitaOstetrica', component: VisitaOstetrica },
      { path: 'print', name: 'Print', component: Print }
    ]
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
