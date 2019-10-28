import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';

// 自定义样式
// import '@/assets/element-theme-custom/index.css';
import 'font-awesome/css/font-awesome.min.css';

// 样式初始化
import 'normalize.css';

// 全局组件
import flexGrowRow from '@/components/flex-grow-row';

// 全局自定义指令
import autoHeight from '@/utils/v-directive/auto-height';

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.component('flex-grow-row', flexGrowRow);

Vue.directive('auto-height', autoHeight);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
