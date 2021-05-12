export default (globalRoutes, moduleRoutes, moduleName) => {
    const frameRoute = globalRoutes.find((r) => {
        return r.name === 'frame';
    });
    const viewRoute = globalRoutes.find((r) => {
        return r.name === 'view';
    });
    const frameRoutes = moduleRoutes.map((r) => {
        const nr = Object.assign({}, r);
        nr.path = `${moduleName}/${nr.path}`;
        nr.meta = {
            type: 'frame'
        };
        return nr;
    });

    const pageRoutes = [];

    const processPageRoutes = (routes, parent) => {
        let nr;
        let children;
        for (let i = 0; i < routes.length; i++) {
            nr = Object.assign({}, routes[i]);
            nr.name = `page-${nr.name}`;
            children = nr.children;
            nr.children = [];
            nr.meta = {
                type: 'view'
            };
            if (!parent) {
                nr.path = `${moduleName}/${nr.path}`;
                pageRoutes.push(nr);
            } else {
                parent.children.push(nr);
            }
            if (Array.isArray(children)) {
                processPageRoutes(children, nr);
            }
        }
    };
    processPageRoutes(moduleRoutes);

    if ('children' in frameRoute) {
        frameRoute.children = frameRoute.children.concat(frameRoutes);
    } else {
        frameRoute.children = frameRoutes;
    }
    if ('children' in viewRoute) {
        viewRoute.children = viewRoute.children.concat(pageRoutes);
    } else {
        viewRoute.children = pageRoutes;
    }
    return globalRoutes;
};
