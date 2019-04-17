// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import 'bootstrap';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueSvgIcon from 'vue-svgicon';

import './styles/index.scss';

import './assets/icons';
import './components';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);

Vue.use(VueSvgIcon, {
  tagName: 'svg-icon',
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
