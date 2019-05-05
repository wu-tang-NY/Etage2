import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layouts/main';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',

  scrollBehavior() {
    return { x: 0, y: 0 };
  },

  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Main',
          component: () => import('@/views/Main'),
        },
      ],
    },
    {
      path: '/popup',
      name: 'ModalInfo',
      component: () => import('@/views/modal'),
    },
  ],
});
