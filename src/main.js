// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import 'lib-flexible/flexible'; // rem 支持用
import infiniteScroll from 'vue-infinite-scroll';
import Notify from 'vue2-notify';

Vue.use(infiniteScroll);
Vue.use(Notify, { visibility: 2000, position: 'bottom-full' });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
