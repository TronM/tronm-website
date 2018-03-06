import axios from '@/helper/axios';
import config from '@/config';

import auth from './auth';

const instance = axios.create({ baseURL: config.server.api });

async function getPortfolios({ page, pagesize }) {
    const params = {
        rnd: new Date().getTime(), // 防止缓存
        sort: { 'created': -1 },
        limit: pagesize,
        offset: (page - 1) * pagesize
    };
    let portfolios;
    try {
        const accessToken = await auth.getAccessToken();
        const authorizationHeader = await auth.getAuthorizationHeader(accessToken);
        if (authorizationHeader) {
            const headers = { 'Authorization': authorizationHeader };
            if (auth.isAdmin()) {
                portfolios = await instance.get('/portfolio', { headers, params });
            } else if (auth.isCustomer()) {
                portfolios = await instance.get('/customer_portfolio', { headers, params });
            }
            return portfolios;
        }
    } catch (err) {
        console.log('Authenticated failed');
    }
    portfolios = await instance.get('/guest_portfolio', { params });
    return portfolios;
}

async function getArticles() {
    const articles = await instance.get('/articles');
    return articles;
}

async function getTags() {
    const tags = await instance.get('/tags');
    return tags;
}

export default {
    getPortfolios,
    getArticles,
    getTags
};
