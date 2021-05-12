import Vue from 'vue';
import Router from 'vue-router';
import routes from 'deploy/src/router/routes.js';

Vue.use(Router);

const createRouter = () => {
    return new Router({
        mode: 'history',
        base: __dirname,
        routes
    });
};

const resetRouter = () => {
    console.log('resetRouter');
    const newRouter = createRouter();
    router && (router.matcher = newRouter.matcher);
};

const router = createRouter();

router.$addRoutes = (params) => {
    router.matcher = new Router({ mode: 'history' }).matcher;
    router.addRoutes(params);
};

router.beforeEach((to, from, next) => {
    console.log('路由日志', to.name, to.path);
    if (to.matched.length === 0) {
        if (router.matcher.match({ name: 'frame-not-found' }).matched.length > 0) {
            next({
                name: 'frame-not-found'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

router.beforeResolve((to, from, next) => {
    next();
});

router.afterEach((/* to, from */) => {
});

export { resetRouter };
export default router;
