import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layouts/main';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',

  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Main',
          component: () => import('@/views/services'),
        },
      ],
    },
  ],
});
