/* eslint-disable */

/**
 * 打开页面
 * 1. 一级页面（使用绝对路径） this.$openView('/a/b');
 * 2. 二级页面（使用相对路径） this.$openView('a/b');
 * 3. 如果进入到别的路由控制下的页面，要返回前一个页面 this.$openView('/a/b', true);  否则返回它自己的父级页面就不用带true
 *
 * 返回
 * 二级路由返回一级路由  this.$goBack = function() {
 * };();
 *
 * 关闭路由
 * this.$closeView();
 *
 * 刷新
 * this.$refreshView = function() {
 * // 需要刷新的url
 * const fullPath = this.$route.};();
 */

const MyNav = {};
let routerConfig = null; // utils/router-config/index.js
let backPathKey = 'backPath';

MyNav.install = function(Vue, options) {
  const store = options.store;
  const { state, commit } = store;
  routerConfig = state.routerConfig;

  Vue.prototype.$initNav = function() {
    const rootPath = this.$route.fullPath.match(/^\/[a-zA-Z0-9\_\-]*/)[0];
    if (rootPath === state.currentRoute) return;
    const route = {
      title: getTitleByPath(rootPath),
      route: rootPath,
      realPath: this.$route.fullPath,
    };
    commit('setCurrentRoute', rootPath);
    commit('addRoute', route);
  }

  // 打开页面
  Vue.prototype.$openView = function(path, needBackPath = false) {
    // 需要指定返回路径的情况，将返回的路径拼接到参数中
    if (needBackPath) {
      path = addParamInPath(path, backPathKey, this.$route.fullPath);
    }

    let willOpenPath = path;
    // 一级路由
    const rootPath = path.match(/^\/[a-zA-Z0-9\_\.\-]*/)[0];
    const route = state.routes.find(item => item.route === rootPath);
    if (!route) {
      // tab没有则添加
      const route = {
        title: getTitleByPath(rootPath),
        route: rootPath,
        realPath: path,
      };
      commit('addRoute', route);
    } else {
      // tab栏已存在，如果是单纯切换，则跳转至realPath，否则更新realPath
      if (route.route === path) {
        willOpenPath = route.realPath;
      } else {
        let index = state.routes.findIndex(item => item.route === route.route);
        commit('updateRoute', { index, route: { realPath: path } });
      }
    }
    commit('setCurrentRoute', rootPath);
    this.$router.replace(willOpenPath).catch(() => {});
  };

  // 关闭页面
  Vue.prototype.$closeView = function(path) {
    // 一级路由
    const rootPath = path.match(/^\/[a-zA-Z0-9\_\.\-]+/)[0];
    let index = state.routes.findIndex(item => item.route === rootPath);
    // 切换至下一个或上一个标签
    const nextTab = state.routes[index + 1] || state.routes[index - 1];
    if (nextTab) {
      this.$openView(nextTab.route);
    }
    // 点击删除tab标签
    commit('delRoute', { index });
    // 全部删除时回到欢迎界面
    if (state.routes.length === 0) {
      this.$openView('/welcome');
    }
  };

  // 返回上级页面
  Vue.prototype.$goBack = function() {
    // 如果存在backPath这个查询参数，就返回到backPath
    if (this.$route.query[backPathKey]) {
      this.$openView(this.$route.query[backPathKey]);
      return;
    }
    // 清除realPath
    const route = state.routes.find(item => item.route === state.currentRoute);
    route.realPath = state.currentRoute;
    this.$router.replace(state.currentRoute);
  };

  // 刷新页面
  Vue.prototype.$refreshView = function() {
    // 需要刷新的url
    const fullPath = this.$route.fullPath;
    this.$router.replace('/welcome/_empty');
    this.$nextTick(() => {
      this.$router.replace(fullPath);
    });
  };
};

// 根据path，从vuex的routerConfig查找相应的title
function getTitleByPath(path) {
  path = path.split('?')[0];
  let result = '';
  for (let i = 0; i < routerConfig.length; i++) {
    var s = routerConfig[i].routes.find(item => item.path === path);
    if (s) {
      result = s.title;
      break;
    }
  };
  return result;
};

function addParamInPath(path, key, value) {
  const symbol = path.indexOf('?') === -1 ? '?' : '&';
  return `${path}${symbol}${key}=${value}`;
};

export default MyNav;
