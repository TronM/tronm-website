import axios from 'axios';

function create({ baseURL }) {
    const instance = axios.create({
        baseURL,
        timeout: 5000
    });
    instance.interceptors.response.use(({ status, data }) => {
        if (status >= 200 && status < 300) {
            return data;
        } else if (status >= 400 && status < 500) {
            throw new Error('Client Error');
        } else if (status >= 500) {
            throw new Error('Server Error');
        }
        // Do nothing for responses with 3xx status code
    }, (err) => {
        return Promise.reject(err);
    });
    return instance;
}

export default {
    create
};
