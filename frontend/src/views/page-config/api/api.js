import axios from 'deploy/src/http/http';

const base = '';
const queryBySql = (Params) => {
    return axios.get(`${base}/_api/newrecordService`, { params: Params });
};

const queryByUrl = (url) => {
    return axios.get(url);
};

const getConfig = (id, Params) => {
    return axios.get(`${base}/_api/datave/ide/page/${id}`, { params: Params });
};

const saveConfig = (Params) => {
    return axios.post(`${base}/_api/datave/ide/page/save`, Params);
};

export { queryBySql, queryByUrl, getConfig, saveConfig };
