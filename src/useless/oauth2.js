import KnockerAPI from './knocker';
import config from '../config';
import token from '../helper/token';

class OAuth2 extends KnockerAPI {
    constructor() {
        super({ baseURL: config.server.oauth2 });
    }
  
    async refreshAccessToken() {
        const refreshToken = token.getRefreshToken();
        const params = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        };
        const { access_token: accessToken } = await this.instance.post('/oauth2/token', params);
        token.setAccessToken(accessToken);
    }

}

export default OAuth2;