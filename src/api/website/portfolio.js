import axios from '@/helper/axios';
import config from '@/config';

import auth from './auth';

const instance = axios.create({ baseURL: config.server.api });

const sibling = async id => {
    const params = {
        rnd: new Date().getTime(), // 防止缓存
        sort: { 'created': -1 },
        fields: {'id': 1, '_id': 0},
        limit: 100
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

    let result = {};
    for (const index in portfolios) {
        if (id === portfolios[index].id) {
            if (+index === 0 && portfolios.length > 1) {
                result.next = portfolios[1];
                break;
            }

            if (+index === portfolios.length - 1 && portfolios.length > 1) {
                result.prev = portfolios[+index - 1];
                break;
            }

            result.prev = portfolios[+index - 1];
            result.next = portfolios[+index + 1];
            break;
        }
    }

    return result;
};

export default {
    sibling
};
