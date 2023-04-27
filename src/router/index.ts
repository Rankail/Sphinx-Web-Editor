import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Docs from '@/views/Docs.vue';
import Editor from '@/views/Editor.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/docs',
      name: 'Docs',
      component: Docs
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    }
  ]
})

export default router
