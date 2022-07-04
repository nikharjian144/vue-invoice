import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'invoices',
      component: () => import('../views/InvoicesView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }/*,
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import('../views/InvoicesView.vue')
    }*/
  ]
})

export default router
