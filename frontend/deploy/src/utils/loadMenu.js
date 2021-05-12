import axios from 'deploy/src/http/http';

function urlReplace(url) {
    const _contextPath = '/_api';
    let realUrl = url || '';
    if (realUrl.indexOf('http://') < 0) {
        realUrl = `${_contextPath}/${realUrl}`;
    }
    return realUrl;
}

function getChildren(vm, node) {
    let extendConf = {};
    try {
        extendConf = JSON.parse(node.extendConf);
    } catch (e) {
        console.log(e);
    }
    extendConf = extendConf || {};
    node.extendConf = extendConf;
    if (node.url) {
        const url = extendConf.newUrl || node.url;
        node.url = urlReplace(url);
    }
    if (node.url && (extendConf.isBlank !== '1') && (extendConf.isRouter !== '1')) {
        const { routes } = vm.router.options;
        const frameRoute = routes.find((r) => {
            return r.name === 'frame';
        });
        const viewRoute = routes.find((r) => {
            return r.name === 'view';
        });
        frameRoute.children.push({
            path: `meta/${node.menuId}`,
            name: node.menuId,
            component: () => import('dacp-meta-web/src/views/frame/components/iframe.vue'),
            children: [],
            meta: {
                type: 'frame',
                url: node.url
            }
        });
        viewRoute.children.push({
            path: `meta/${node.menuId}`,
            name: `page-${node.menuId}`,
            component: () => import('dacp-meta-web/src/views/frame/components/iframe.vue'),
            children: [],
            meta: {
                type: 'view',
                url: node.url
            }
        });
    }
    if (Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
            getChildren(vm, node.children[i]);
        }
    }
}

export default (vm) => {
    return axios('/_api/menu/home/children').then((res) => {
        const { data } = res;
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                getChildren(vm, data[i]);
            }
            vm.router.$addRoutes(vm.router.options.routes);
            return data;
        }
    }).catch((e) => {
        console.log(e);
    });
};
