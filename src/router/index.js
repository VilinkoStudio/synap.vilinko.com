import { createRouter, createWebHistory } from 'vue-router'
import SynapHero from '../components/SynapHero.vue'
import SynapDownload from '../components/SynapDownload.vue'
import Notfound from '../components/Notfound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SynapHero,
  },
  {
    path: '/download',
    name: 'Download',
    component: SynapDownload,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: Notfound,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router