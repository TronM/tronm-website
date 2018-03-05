import OAuth2 from '../service/iam';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXPIRES_IN_KEY = 'expiresIn';

const oauth2 = new OAuth2();

export function setRefreshToken() {
  return localStorage.setItem(REFRESH_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export async function getAccessToken() {
    if (isTokenExpired()) {
        const refreshToken = getRefreshToken();
        await oauth2.refreshAccessToken(refreshToken);
    }
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    return accessToken;
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
