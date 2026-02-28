import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/Characters.vue')
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: () => import('../views/Episodes.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/Gallery.vue')
    }
  ]
})

export default router
