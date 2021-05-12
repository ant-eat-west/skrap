import { Vue, router, store, Page } from 'deploy/src/inter.js';

import loadAllRouter from 'deploy/src/utils/loadLines.js';
import { setEnv, setOriginStoreRoutes } from 'deploy/src/utils/registLine.js';
import 'deploy/src/utils/performance/perf';
import pagePlugin from 'deploy/src/plugin.js';

import simulateLogin from 'deploy/src/utils/simulateLogin.js';
// import loadMenu from 'deploy/src/utils/loadMenu.js';
// import getGlobalVars from 'deploy/src/utils/getGlobalVars.js';

import routes from './router/routes.js';
// import testMenu from '../../static/conf/menu.json';
import { createNamespacedHelpers } from 'vuex';
import VueIntro from 'vue-introjs';
import 'intro.js/introjs.css';
import CKEditor from 'ckeditor4-vue';
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';

Vue.use(VueIntro);
Vue.use(CKEditor);
Vue.directive('tooltip', VTooltip);
Vue.directive('close-popover', VClosePopover);
Vue.component('v-popover', VPopover);

const { mapMutations } = createNamespacedHelpers('global');
// import * as Sentry from '@sentry/browser';
// import * as Integrations from '@sentry/integrations';

// 埋点

/* Sentry.init({
    dsn: 'http://0f134fac1add49b08464e7a2e3b900db@192.168.1.217:9000/2',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
});

Sentry.captureMessage('Something went wrong');
axios('/sdfvsdfvsdfvs'); */

// console.log(a+b);

router.addRoutes(routes);
router.options.routes = routes;

setEnv(router);
setOriginStoreRoutes(routes);

Promise.all([pagePlugin()]).then(() => {
    (async function process() {
        await simulateLogin();
        loadAllRouter();
        // const deployFront = require('deployFront');
        const appLoading = require('appLoading');
        const menuData = [];
        // const vars = await getGlobalVars(deployFront);
        if (/^\/(frame|view)\//.test(window.location.pathname)) {
            // menuData = await loadMenu(deployFront);
        }
        new Vue({
            router,
            store,
            render: (h) => h(Page),
            methods: {
                ...mapMutations(['setFullMenu', 'setVars'])
            },
            beforeCreate() {
                Vue.prototype.$bus = this;
            },
            created() {
                if (Array.isArray(menuData) && menuData.length > 0) {
                    // menuData.push(testMenu.data);
                    this.setFullMenu(menuData);
                }
                // this.setVars(vars);
                // console.log('globalVars', store.state.global.vars);
            },
            mounted() {
                appLoading && appLoading.end();
            }
        }).$mount('#app');
    })();
});
