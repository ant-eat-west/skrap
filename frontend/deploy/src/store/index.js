import Vue from 'vue';
import Vuex from 'vuex';
import global from './global/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        global
    },
    strict: debug,
    namespaced: true
});
