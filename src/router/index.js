import Vue from 'vue';
import Router from 'vue-router';
import Portfolio from '@/views/website/portfolio';
import PortfolioDetail from '@/views/website/portfolio/Detail.vue';
import ResetPassword from '@/views/website/Customer/ResetPassword.vue';

Vue.use(Router);

// 一个空模板，方便子节点使用
const Root = Vue.component('root', {
    template: '<router-view></router-view>'
});

export default new Router({
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/portfolio'
        },
        {
            path: '/portfolio',
            name: 'portfolio',
            component: Portfolio
        },
        {
            path: '/portfolio/:id',
            name: 'portfolio-detail',
            component: PortfolioDetail
        },
        {
            path: '/customer',
            component: Root,
            children: [
                {
                    path: 'reset-password',
                    name: 'resetPassword',
                    component: ResetPassword
                }
            ]
        }
    ]
});
