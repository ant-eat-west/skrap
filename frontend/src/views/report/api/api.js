import axios from 'deploy/src/http/http';

const base = '';
const getConfig = (id, Params) => {
    return axios.get(`${base}/_api/datave/ide/page/${id}`, { params: Params });
};

const savePage = (Params) => {
    return axios.post(`${base}/_api/datave/ide/page/save`, Params);
};

export { getConfig, savePage };
