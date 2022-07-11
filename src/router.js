// import is from "is_js";
import Vue from "vue";
import Router from "vue-router";
import Config from "@/config/Config";
import { buildPath } from "@/helper";
import Auth from "@/services/Auth";
Vue.use(Router);
/* namespace */
const NAMESPACE_CUSTOMER= "customer";

const CUSTOMER = buildPath(NAMESPACE_CUSTOMER);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        let result;
        if (savedPosition) {
            result = savedPosition;
        } else if (to.path === from.path) {
            result = null;
        } else {
            result = {x: 0, y: 0};
        }
        return result;
    },
    routes: [
        {
            path: Config.URL.LOGIN_PATH,
            name: "Login",
            component: () => import("@/pages/login/login.vue"),
            meta: {
                requiresAuth: false,
                title: "LoginPage"
            }
        },{
            path: Config.URL.ADMIN_PATH,
            name: "Admin",
            component: () => import("@/pages/admin/admin.vue"),
            meta: {
                title: "AdminPage"
            }
        },
        {
            path: `${CUSTOMER.EDIT}/:id` ,
            name: "CustomerEdit",
            component: () => import(/* webpackChunkName: "about" */ "@/pages/admin/CustomerEdit.vue"),
            meta: {
                title: "Edit Customer"
            }
        },
    ]
});
router.beforeEach(async (to, from, next) => {
    const accessToken = Auth.getAccessToken();
    if(to.path != '/login') {
        if(!accessToken) {
            next(Config.URL.LOGIN_PATH);
        } else {
            next();
        }
    } else {
        if(accessToken) {
            next(Config.URL.ADMIN_PATH);
        }
        next();
    }
});
export default router;