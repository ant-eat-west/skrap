import axios from 'axios';
// import Vue from 'vue';

function getAxios() {
    axios.defaults.timeout = 100000;

    const userAgent = navigator.userAgent.toLowerCase();
    const isIe = /(msie|trident).*?([\d.]+)/.test(userAgent);

    // const msgVue = new Vue({});

    axios.interceptors.request.use(
        config => {
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            if (isIe) {
                config.headers.common['Cache-Control'] = 'no-cache';
                config.cache = false;
                config.headers.get = config.headers.get || {};
                config.headers.get['If-Modified-Since'] = '0';
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        response => {
            const { redirect } = response.headers;
            if (redirect === 'true') {
                const { redirecturl } = response.headers;
                if (redirecturl) {
                    window.location.href = `${window.location.origin}/user-login`;
                }
            }
            return response;
        },
        error => {
            const { message } = error;
            const { data } = error;
            console.warn(message, data, error);
            if (message) {
                // msgVue.$message.error(message);
                /* msgVue.$notify.error({
                    title: '失败',
                    message
                }); */
            }
            return Promise.reject(error);
        }
    );
    // 解决 get 方法不能传 []
    axios.interceptors.request.use(
        config => {
            let { url } = config;
            // get参数编码
            if (config.method === 'get' && config.params) {
                url += '?';
                const keys = Object.keys(config.params);
                for (const key of keys) {
                    url += `${key}=${encodeURIComponent(config.params[key])}&`;
                }
                url = url.substring(0, url.length - 1);
                config.params = {};
            }
            config.url = url;
            return config;
        }
    );
    return axios;
}

export default getAxios();
