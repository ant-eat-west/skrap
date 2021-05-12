import './registLine';
import axios from 'deploy/src/http/http';

let config = null;
let configDefer = null;

const loadConfig = () => {
    const env = process.env.NODE_ENV;
    let serviceUrl = '/conf/dev-service-config.json';
    if (env === 'production') {
        serviceUrl = '/_api/module/routes/get';
    }

    return new Promise((resolve) => {
        axios(serviceUrl).then((res) => {
            const services = res.data;
            Object.values(services).forEach(service => {
                service.loaded = false;
            });
            config = services;
            resolve();
        }).catch(() => {
            config = {};
            resolve();
        });
    });
};

configDefer = loadConfig();

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;

        script.onerror = function () {
            reject();
        };
        script.onload = function () {
            resolve();
        };
        (document.head || document.body).appendChild(script);
    });
};

export default async () => {
    if (!config) {
        await configDefer;
    }
    Object.keys(config).map(key => {
        const cfg = config[key];
        for (let i = 0; i < cfg.src.length; i++) {
            loadScript(cfg.src[i]);
        }
        return cfg;
    });
};
