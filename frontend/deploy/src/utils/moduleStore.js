const registerModuleStore = function (name, parentStore, store) {
    parentStore.registerModule(name, Object.assign(store, {
        namespaced: true
    }));
};

const unregisterModuleStore = function (name, parentStore) {
    parentStore.unregisterModule(name);
};

export { registerModuleStore, unregisterModuleStore };
