import $ from 'jquery';
import axios from '@/helper/axios';
import config from '@/config';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXPIRES_IN_KEY = 'expires_in';
const TOKEN_TYPE_KEY = 'token_type';
const USER_KEY = 'user';
const USER_ROLES_KEY = 'roles';

const iam = axios.create({ baseURL: config.server.iam });
const oauth2 = axios.create({ baseURL: config.server.oauth2 });

function hasUserRole(role) {
    const value = localStorage.getItem(USER_ROLES_KEY);
    if (value === null) return false;
    const roles = JSON.parse(value);
    return roles.find(({ name }) => name === role) !== undefined;
}

function isAdmin() {
    return hasUserRole('admin');
}

function isCustomer() {
    return hasUserRole('customer');
}

function getTokenExpirationDate() {
    const expiresIn = localStorage.getItem(EXPIRES_IN_KEY) || 0;
    const date = new Date(0);
    date.setUTCSeconds(expiresIn);
    return date;
}

function isTokenExpired() {
    const expirationDate = getTokenExpirationDate();
    return expirationDate < new Date();
}

async function getAccessToken() {
    if (isTokenExpired()) {
        await refreshAccessToken();
    }
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (refreshToken !== null) {
        const data = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        };
        const {
            access_token: accessToken,
            expires_in: expiresIn
        } = await oauth2.post('/oauth2/token', $.param(data), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic dHJvbm06MTIzcXdlIUAj'
            }
        });
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(EXPIRES_IN_KEY, expiresIn);
    }
}

async function getAuthorizationHeader(accessToken) {
    const token = accessToken || await getAccessToken();
    if (token !== null) {
        const tokenType = localStorage.getItem(TOKEN_TYPE_KEY) || 'Bearer';
        return `${tokenType} ${token}`;
    }
}

async function login({ username, password }) {
    const {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: tokenType,
        expires_in: expiresIn
    } = await iam.post('/signin', { username, password });
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(TOKEN_TYPE_KEY, tokenType);
    localStorage.setItem(EXPIRES_IN_KEY, expiresIn);
    localStorage.setItem(USER_KEY, username);
    const roles = await iam.get(`/user/${username}/role`, {
        headers: {
            'Authorization': `${tokenType} ${accessToken}`
        }
    });
    localStorage.setItem(USER_ROLES_KEY, JSON.stringify(roles));
}

async function logout() {
    const accessToken = getAccessToken();
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    await iam.post('/signout', {
        access_token: accessToken,
        refresh_token: refreshToken
    });
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_ROLES_KEY);
}

async function activate(accessToken) {
    const authorizationHeader = await getAuthorizationHeader(accessToken);
    const headers = authorizationHeader ? { 'Authorization': authorizationHeader } : {};
    await iam.post('/activate', {}, { headers });
}

async function resetPassword(password, accessToken) {
    const authorizationHeader = await getAuthorizationHeader(accessToken);
    const headers = authorizationHeader ? { 'Authorization': authorizationHeader } : {};
    await iam.post('/reset_password', { password }, { headers });
}

export default {
    getAccessToken,
    refreshAccessToken,
    getAuthorizationHeader,
    login,
    logout,
    activate,
    resetPassword,
    isAdmin,
    isCustomer
};
