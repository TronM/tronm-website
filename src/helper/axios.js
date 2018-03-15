import axios from 'axios';

const create = ({ baseURL }) => {
    const instance = axios.create({
        baseURL,
        timeout: 5000
    });
    instance.interceptors.response.use(response => {
        return filter(response);
    }, err => {
        return filter(err.response);
    });
    return instance;
};

const filter = response => {
    return {
        status: response.status,
        data: response.data
    };
};

export default {
    create
};
