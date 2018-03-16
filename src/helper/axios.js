import axios from 'axios';

const create = ({ baseURL }) => {
    const instance = axios.create({
        baseURL,
        timeout: 5000
    });
    instance.interceptors.response.use(res => handle(res), err => handle(err.response));
    return instance;
};

const handle = res => {
    return res.data;
    // return {
    //     status: res.status,
    //     data: res.data
    // };
};

export default {
    create
};
