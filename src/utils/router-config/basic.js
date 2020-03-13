import view from '@/views/layout/view';

import welcome from '@/views/layout/basic/welcome';
import empty from '@/views/layout/basic/welcome/empty';

export default {
  classify: 'basic',
  key: 'basic',
  title: '基本内容',
  icon: 's-home',
  access: true,
  routes: [
    {
      path: '/welcome',
      key: 'welcome',
      access: true,
      meta: {
        permission: {},
      },
      title: '欢迎使用',
      component: view,
      children: [
        {
          path: '',
          component: welcome,
        }, {
          path: '_empty',
          component: empty,
        },
      ],
    },
  ],
};
