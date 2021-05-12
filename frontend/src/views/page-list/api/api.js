import axios from 'deploy/src/http/http';

const base = '';
const getPageList = (Params) => {
    return axios.get(`${base}/_api/datave/ide/pages`, { params: Params });
};

const savePage = (Params) => {
    return axios.post(`${base}/_api/datave/ide/page/save`, Params);
};

const deletePage = (id) => {
    return axios.delete(`${base}/_api/datave/ide/page/delete/${id}`);
};

export { getPageList, savePage, deletePage };
