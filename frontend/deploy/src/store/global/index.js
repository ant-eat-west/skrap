const moment = require('moment');

const storeState = () => {
    return {
        mainTest: '主项目属性',
        timeNow: '模块之间数据交互',
        fullMenu: [],
        fullMenuMap: {},
        vars: {}
    };
};

const mutations = {
    setFullMenu(state, menu) {
        state.fullMenu = menu;
        this.commit('global/setFullMenuMap', menu);
    },
    setBEHAVIORDATA(state, model) {
        const BEHAVIORNAME = `BEHAVIOR-${state.vars.userId}`;
        let BEHAVIORDATA = localStorage.getItem(BEHAVIORNAME);
        try {
            BEHAVIORDATA = JSON.parse(BEHAVIORDATA);
        } catch (e) {
            BEHAVIORDATA = [];
        }
        BEHAVIORDATA = Array.isArray(BEHAVIORDATA) ? BEHAVIORDATA : [];
        BEHAVIORDATA.unshift({
            id: model.modelcode,
            name: model.modelname,
            isBlank: model.extendConf.isBlank,
            url: model.url,
            date: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        BEHAVIORDATA = BEHAVIORDATA.slice(0, 5);
        localStorage.setItem(BEHAVIORNAME, JSON.stringify(BEHAVIORDATA));
    },
    setFullMenuMap(state, menu) {
        state.fullMenuMap = {};
        const getChildren = (node, navId) => {
            if (node.menuId !== navId) {
                node.navId = navId;
            }
            if (node.menuId in state.fullMenuMap) {
                console.log('重复', node.menuId);
            }
            state.fullMenuMap[node.menuId] = node;
            if (Array.isArray(node.children)) {
                for (const child of node.children) {
                    getChildren(child, navId);
                }
            }
        };
        for (const child of menu) {
            getChildren(child, child.menuId);
        }
    },
    setVars(state, vars) {
        state.vars = vars;
    }
};

const actions = {};

export default {
    namespaced: true,
    state: storeState,
    mutations,
    actions
};
