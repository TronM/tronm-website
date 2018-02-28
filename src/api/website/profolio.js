import axios from '@/helper/axios';

const base = '/guest_portfolio';

const list = params => {
    let _params = {};
    _params.rnd = new Date().getTime(); // 防止缓存
    _params.sort = { 'created': -1 };
    _params.limit = params.pagesize;
    _params.offset = (params.page - 1) * params.pagesize;

    if (params.filters && params.filters.tag !== '') {
        _params.filters = {'tag': {'$in': [params.filters.tag]}};
    }

    return axios.get(`${base}`, {params: _params}).then(res => res);
};

export default {
    list
};
