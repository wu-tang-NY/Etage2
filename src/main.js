// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import 'bootstrap';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueSvgIcon from 'vue-svgicon';
import PortalVue from 'portal-vue';
import Multiselect from 'vue-multiselect';
import VueTheMask from 'vue-the-mask';

import './styles/index.scss';

import './assets/icons';
import './components';

import App from './App';
import router from './router';

import EventBus from './eventbus';

Vue.config.productionTip = false;

Vue.component('multiselect', Multiselect);

Vue.use(VueAwesomeSwiper);
Vue.use(PortalVue);
Vue.use(VueTheMask);

Vue.use(VueSvgIcon, {
  tagName: 'svg-icon',
});

Vue.prototype.$eventbus = EventBus;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
