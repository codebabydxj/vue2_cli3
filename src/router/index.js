import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

import layout from '@/views/layout';
import login from '@/views/login';

Vue.use(VueRouter);

let routes = [];
store.state.routerConfig.forEach((routerWrap) => {
  routes = routes.concat(routerWrap.routes);
});

export default new VueRouter({
  // 这个功能是为了去掉url地址中的#，但需要后端的配合，否则你正常浏览时ok，但刷新页面之后会404
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: layout,
      redirect: '/welcome',
      children: routes,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ],
});
