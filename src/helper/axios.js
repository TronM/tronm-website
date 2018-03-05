import axios from 'axios';

function create({ baseURL }) {
    const instance = axios.create({
        baseURL,
        timeout: 5000
    });
    instance.interceptors.response.use(({ status, data }) => {
        if (status === 200) {
            return data;
        } else if (status >= 400 && status < 500) {
            throw new Error('User Error');
        } else {
            throw new Error('Server Error');
        }
    }, (err) => {
        return Promise.reject(err);
    });
    return instance;
}

export default {
    create
};
