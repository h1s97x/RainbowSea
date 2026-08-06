import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: { transition: 'fade' }
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('@/views/characters/index.vue'),
      meta: { transition: 'slide-left' }
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: () => import('@/views/episodes/index.vue'),
      meta: { transition: 'slide-left' }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/gallery/index.vue'),
      meta: { transition: 'slide-up' }
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
