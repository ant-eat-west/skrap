import { resetRouter } from './router';
import processModuleRoutes from './processModuleRoutes.js';

let globalRouter;
let storeRoutes = [];
const routerLines = [];

// 挂载业务线数据
function registLine(appName, router) {
    if (router) {
        routerLines.push(router);
        processModuleRoutes(storeRoutes, router.routes, appName);
        resetRouter();
        console.log(storeRoutes);
        globalRouter.addRoutes(storeRoutes);
    }
}

export const setOriginStoreRoutes = function (routes) {
    storeRoutes = routes;
};

export const setEnv = (router) => {
    if (router) {
        globalRouter = router;
        window.deployFront = Object.assign(window.bapp || {}, {
            router: globalRouter,
            util: {
                registLine
            }
        });
    }
};
