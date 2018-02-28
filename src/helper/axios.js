import axios from 'axios';
import config from '../config';

const instance = axios.create({
    baseURL: config.server.api,
    // withCredentials: true,
    timeout: 5000
});

// let loadingInstancce = null;

instance.interceptors.request.use((require) => {
    // // 全屏遮罩
    // loadingInstancce = Loading.service({
    //     fullscreen: true,
    //     spinner: 'el-icon-loading',
    //     text: '加载中'
    // });
    return require;
});

instance.interceptors.response.use(response => {
    // loadingInstancce.close();
    const { data, config } = response;
    // console.log(response);
    if ((response.status === 200 || response.status === 201 || response.status === 204) && (config.method === 'post' || config.method === 'put' || config.method === 'delete')) {
        // Notification.success({
        //     title: '操作成功'
        // });
    } else if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
        // Notification.error({
        //     title: response.statusText
        // });
        // console.log(response.statusText);
    }
    return data;
}, (error) => {
    const { data } = error.response;

    if (error.response.status === 401) {
        console.log('没有权限');
    }

    return data;
});

export default instance;
