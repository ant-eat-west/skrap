import axios from 'deploy/src/http/http';

const base = '';
const queryBySql = (Params) => {
    return axios.get(`${base}/_api/newrecordService`, { params: Params });
};

const queryByUrl = (url) => {
    return axios.get(url);
};

export { queryBySql, queryByUrl };
