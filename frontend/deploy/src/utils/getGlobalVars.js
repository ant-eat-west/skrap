import axios from 'deploy/src/http/http';

export default () => {
    const para = {};
    if (window.location.search.indexOf('token=') > -1) {
        const getParam = function (name) {
            const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
            const r = window.location.search.substr(1).match(reg);
            return r !== null ? unescape(r[2]) : null;
        };
        para.token = getParam('token');
    }
    return axios('/_api/open/loginInfo/platform/params/4login', {
        params: para
    }).then((res) => {
        const { data } = res;
        return data;
    }).catch((e) => {
        console.log(e);
    });
};
