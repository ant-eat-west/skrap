import Vue from 'vue';

import ElementUI from 'element-ui';
import ElementUEX from 'element-uex';
Vue.use(ElementUI);
Vue.use(ElementUEX);

import store from 'dacp-deploy/src/store/index.js';

export const createVue = function(Compo) {
  	return new Vue({
		store,
		render: h => h(Compo)
	}).$mount();
};