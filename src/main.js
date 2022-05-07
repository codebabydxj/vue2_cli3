import Vue from 'vue';

// 全局ele引入
import ElementUI from 'element-ui';
// 全局自定义指令
import autoHeight from '@/utils/v-directive/auto-height';

// 请求插件和路由插件
import http from '@/utils/plugin/http';
import nav from '@/utils/plugin/nav';

// 全局组件
import flexGrowRow from '@/components/flex-grow-row';

import App from './App';
import router from './router';
import store from './store';

// 自定义样式
import 'element-ui/lib/theme-chalk/index.css';
// import '@/assets/element-theme-custom/index.css';
import 'font-awesome/css/font-awesome.min.css';

// 样式初始化
import 'normalize.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(http);
Vue.use(nav, { store });

Vue.component('flex-grow-row', flexGrowRow);

Vue.directive('auto-height', autoHeight);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
