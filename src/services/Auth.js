import VueCookies from 'vue-cookies';
import Vue from "vue";
Vue.use(VueCookies);
const COOKIE_ACCESS_TOKEN = `atk`;
const COOKIE_REFRESH_TOKEN = `rtk`;

const cookieSetting = {
    path: '/',
    domain: '',
};

export const setCookie = (name, value) => VueCookies.set(name, value, cookieSetting);

export const getCookie = (name) => VueCookies.get(name);

export const removeCookie = (name) => VueCookies.remove(name, cookieSetting);

class AuthHelpers {
    getRefreshToken() {
        return getCookie(COOKIE_REFRESH_TOKEN);
    }
    storeRefreshToken(refreshToken) {
        setCookie(COOKIE_REFRESH_TOKEN, refreshToken);
    }
    getAccessToken() {
        return getCookie(COOKIE_ACCESS_TOKEN);
    }
    storeAccessToken(accessToken) {
        setCookie(COOKIE_ACCESS_TOKEN, accessToken);
    }
    removeAccessToken(){
        removeCookie(COOKIE_ACCESS_TOKEN)
    }
}

const Instance = new AuthHelpers();
export default Instance;