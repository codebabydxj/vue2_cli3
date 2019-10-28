import Vue from 'vue';
import Vuex from 'vuex';

import routerConfig from '@/utils/router-config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    routerConfig,
    routes: [],
    // 当前路由
    currentRoute: '/',
    // 常量
    consts: [],
  },
  getters: {
    getConstByGroup: state => (group) => {
      const groupName = state.consts.find(item => item.group === group);
      const obj = {};
      if (groupName && groupName.itemList) {
        groupName.itemList.forEach((v) => { obj[v.code] = v.name; });
      }
      return obj;
    },
  },
  mutations: {
    setCurrentRoute(state, rootPath) {
      state.currentRoute = rootPath;
    },
    setConsts(state, consts) {
      state.consts = consts;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      // 清空用户信息
      state.user = {};
      // 清空导航栏
      state.currentRoute = '/';
      state.routes = [];
      // 清空所有菜单权限
      state.routerConfig.forEach((v) => { v.access = false; });
    },
  },
  actions: {
  },
  modules: {
  },
});
