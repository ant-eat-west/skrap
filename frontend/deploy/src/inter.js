import Vue from 'vue';
import VueRouter from 'vue-router';
import Page from './Page.vue';
import store from './store/index.js';
import axios from './http/http';


import ElementUI from 'element-ui';

import ElementUEX from 'element-uex';

// import 'element-ui/lib/theme-chalk/index.css';
import './theme/element-ui/lib/index.css';

import 'element-uex/lib/theme-default/index.css';

import './theme/index.scss';

// remixicon
import 'remixicon/fonts/remixicon.css';
import router from './utils/router.js';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(ElementUI);
Vue.use(ElementUEX);

Vue.use(VueRouter);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

global._ = require('underscore');

global.Vue = Vue;

/* const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
  ]
}) */
export {
    Vue,
    router,
    store,
    Page,
    axios
};
