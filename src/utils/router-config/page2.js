import view from '@/views/layout/view';

import page21 from '@/views/layout/page2/page2-1';
import page21Details from '@/views/layout/page2/page2-1/page2-1-details';

export default {
  classify: 'page2',
  key: 'page2',
  title: '弹窗',
  icon: 'caret-right',
  access: true,
  routes: [
    {
      path: '/page2-1',
      key: 'page2-1',
      access: true,
      meta: {
        permission: {},
      },
      title: 'page2-1',
      component: view,
      children: [
        {
          path: '',
          component: page21,
        },
        {
          path: 'page2-1-details',
          component: page21Details,
        },
      ],
    },
  ],
};
