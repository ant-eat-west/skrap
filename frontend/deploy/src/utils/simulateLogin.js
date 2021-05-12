import axios from 'deploy/src/http/http';
import qs from 'qs';

export default () => {
    return axios({
        method: 'post',
        url: '/_api/login?redirect=/console/frame',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            userId: 'cjd1Y5HmNj4W4FHF3j0BOw==',
            pwd: 'rG9b6yrufYIk/d4FiZd8Hg==',
            callback: 'none'
        })
    }).then((res) => {
        console.log('login success', res);
    }).catch((e) => {
        console.log(e);
    });
};
