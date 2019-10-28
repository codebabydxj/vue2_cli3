import view from '@/views/layout/view';

import page11 from '@/views/layout/page1/page1-1';

export default {
  classify: 'page1',
  key: 'page1',
  title: 'page1',
  icon: '',
  access: false,
  routes: [
    {
      path: '/page1-1',
      key: 'page1-1',
      access: false,
      meta: {},
      title: 'page1-1',
      component: view,
      children: [
        {
          path: '',
          component: page11,
        },
      ],
    },
  ],
};
