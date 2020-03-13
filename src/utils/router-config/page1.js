import view from '@/views/layout/view';

import page11 from '@/views/layout/page1/page1-1';
import page12 from '@/views/layout/page1/page1-2';

export default {
  classify: 'page1',
  key: 'page1',
  title: 'page1',
  icon: 'caret-right',
  access: true,
  routes: [
    {
      path: '/page1-1',
      key: 'page1-1',
      access: true,
      meta: {
        permission: {},
      },
      title: 'page1-1',
      component: view,
      children: [
        {
          path: '',
          component: page11,
        },
      ],
    },
    {
      path: '/page1-2',
      key: 'page1-2',
      access: true,
      meta: {
        permission: {},
      },
      title: 'page1-2',
      component: view,
      children: [
        {
          path: '',
          component: page12,
        },
      ],
    },
  ],
};
