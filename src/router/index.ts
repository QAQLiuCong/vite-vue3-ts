import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router