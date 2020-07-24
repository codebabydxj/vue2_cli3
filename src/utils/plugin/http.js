import axios from 'axios';
import { Message } from 'element-ui';
// eslint-disable-next-line
import qs from 'qs';
import router from '@/router';
import store from '@/store';
import * as API from '@/utils/constants/api';

const http = axios.create({
  baseURL: API.baseUrl,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 跨域允许携带cookie
});

// 请求拦截
http.interceptors.request.use((config) => {
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data);
  }
  // 看token是否需要前端传给后台，需要则打开
  /** let token = window.localStorage.getItem("TOKEN");
  if (token) {
    config.headers.TOKEN = token; // 将token放到请求头发送给服务器
  } */
  return config;
}, err => Promise.reject(err));

// 响应拦截
http.interceptors.response.use((response) => {
  if (response.data.code === 200) {
    return Promise.resolve(response.data);
  }
  if (response.data.code === 405) {
    Message({
      showClose: true,
      message: response.data.msg || `Error: ${response.request.url}`,
      type: 'warning',
    });
    return Promise.reject(response);
  }
  Message({ // 其他状态提示
    showClose: true,
    message: response.data.msg || `Error: ${response.request.url}`,
    type: 'error',
  });
  return Promise.reject(response);
}, (error) => {
  if (error.response.status === 401) {
    // toke过期，重新登录
    store.commit('logout');
    router.replace('/login');
    return Promise.reject(error.response);
  }
  if (error.response.status === 403) {
    Message({ // 没有权限、未授权
      showClose: true,
      message: '没有权限，请授权之后再处理！',
      type: 'error',
    });
    return Promise.reject(error.response);
  }
  Message({
    showClose: true,
    message: error.response.statusText || `Error: ${error.response.request.url}`,
    type: 'error',
  });
  return Promise.reject(error.response);
});

export default {
  install(Vue) {
    Vue.prototype.$http = http;
  },
};
