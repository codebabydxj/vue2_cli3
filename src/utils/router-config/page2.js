import view from '@/views/layout/view';

import page21 from '@/views/layout/page2/page2-1';

export default {
  classify: 'page2',
  key: 'page2',
  title: 'page2',
  icon: '',
  access: false,
  routes: [
    {
      path: '/page2-1',
      key: 'page2-1',
      access: false,
      meta: {},
      title: 'page2-1',
      component: view,
      children: [
        {
          path: '',
          component: page21,
        },
      ],
    },
  ],
};
