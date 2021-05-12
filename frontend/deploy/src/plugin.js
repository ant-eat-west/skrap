import { Vue, axios } from './inter.js';
import { createHelpers } from 'vuex-map-fields';

const pagePlugin = function () {
    window.Vue = Vue;
    window.createHelpers = createHelpers;

    return new Promise((resolve) => {
        axios('/conf/plugin-config.json').then((res) => {
            axios.all(res.data.map((url) => {
                return axios.get(url);
            })).then(
                axios.spread(function () {
                    const args = Array.prototype.slice.apply(arguments);
                    args.forEach(arg => {
                        try {
                            const Fn = Function;
                            const plugin = new Fn(arg.data);
                            plugin();
                        } catch (err) {
                            console.warn(err);
                        }
                    });
                    resolve();
                })
            ).catch((error) => {
                console.log('xxxxx', error);
            });
        }).catch(() => {
            resolve();
        });
    });
};
export default pagePlugin;
