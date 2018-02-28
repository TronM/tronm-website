import Vue from 'vue';
import Router from 'vue-router';
import Profolio from '@/views/website/Profolio';
import ProfolioDetail from '@/views/website/Profolio/Detail.vue';
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
            redirect: '/profolio'
        },
        {
            path: '/profolio',
            component: Root,
            children: [
                {
                    path: '/',
                    name: 'profolio',
                    component: Profolio
                },
                {
                    path: 'detail/:id',
                    name: 'profolio-detail',
                    component: ProfolioDetail
                }
            ]
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
