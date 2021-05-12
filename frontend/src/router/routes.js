const PageView = () => { return import(/* webpackChunkName: "view" */'src/PageView.vue'); };
const pageConfig = () => { return import(/* webpackChunkName: "page-config" */ 'src/views/page-config/PageConfig.vue'); };
const Report = () => { return import(/* webpackChunkName: "report" */ 'src/views/report/Report.vue'); };
const PageList = () => { return import(/* webpackChunkName: "page-list" */ 'src/views/page-list/PageList.vue'); };

const routes = [
    {
        path: '/',
        component: PageList,
        name: 'all'
    },
    {
        path: '/view',
        component: PageView,
        name: 'view',
        children: [
            {
                path: 'page-list',
                component: PageList,
                name: 'page-list'
            },
            {
                path: 'page-config/:id',
                component: pageConfig,
                name: 'page-config'
            },
            {
                path: 'report/:id',
                component: Report,
                name: 'report'
            }
        ]
    }
];

export default routes;
