import { Vue, router, store/* , axios */ } from './inter.js';
import App from './App.vue';
import loadAllRouter from './utils/loadLines.js';
import setEnv from './utils/registLine.js';
import './utils/performance/perf';
import pagePlugin from './plugin.js';

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

setEnv(router);

Promise.all([pagePlugin()]).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App),
        methods: {
        },
        created() {
        },
        mounted() {
        }
    }).$mount('#app');
});

loadAllRouter();
