import KnockerAPI from './knocker';
import config from '../config';
import token from '../helper/token';

class Resourceful extends KnockerAPI {
    constructor() {
        super({ baseURL: config.server.api });
    }

    async getPortfolios({ page, pagesize }) {
        // TODO: inject token storage
        // get token from storage and check user role
        // then get porfolio acccording to the user role
        const accessToken = token.getAccessToken();
        const headers = {};
        const params = {
            rnd: new Date().getTime(), // 防止缓存
            sort: { 'created': -1 },
            limit: pagesize,
            offset: (page - 1) * pagesize
        };
        return await this.instance.get('/guest_portfolio', { headers, params });
    }

    async getArticles() {
        return await this.instance.get('/articles');
    }

    async getTags() {
        return await this.instance.get('/tags');
    }
}

export default Resourceful;
