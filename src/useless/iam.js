import KnockerAPI from './knocker';
import config from '../config';
import token from '../helper/token';

class IAM extends KnockerAPI {
    constructor() {
        super({ baseURL: config.server.iam });
    }
  
    async signin(params) {
        const {
            access_token: accessToken, 
            refresh_token: refreshToken
        } = await this.instance.post('/signin', params);
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
    }
  
    async signout() {
        await this.instance.post('/signout');
        token.clearAccessToken();
        token.clearRefreshToken();
    }
    
    async showUserRoles() {
        await this.instance.get(`/user/role`);
    }
}

export default IAM;
