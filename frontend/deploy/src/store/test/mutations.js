const mutations = {
    setIsRouterAlive (state, val) {
        state.isRouterAlive = val;
    },
    addExcludeCacheRoutes (state, val) {
        state.excludeCacheRoutes.push(val);
    },
    deleteExcludeCacheRoutes (state, val) {
        const index = state.excludeCacheRoutes.indexOf(val);
        state.excludeCacheRoutes.splice(index, 1);
    }
};

export default mutations;
