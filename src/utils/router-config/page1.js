import view from '@/views/layout/view';

import page11 from '@/views/layout/page1/page1-1';
import page12 from '@/views/layout/page1/page1-2';
import page13 from '@/views/layout/page1/page1-3';
import page14 from '@/views/layout/page1/page1-4';
import page15 from '@/views/layout/page1/page1-5';
import importProduct from '@/views/layout/page1/page1-5/components/import-product';

export default {
  classify: 'page1',
  key: 'page1',
  title: '列表',
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
      title: '多选列表',
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
      title: '单选列表',
      component: view,
      children: [
        {
          path: '',
          component: page12,
        },
      ],
    },
    {
      path: '/page1-3',
      key: 'page1-3',
      access: true,
      meta: {
        permission: {},
      },
      title: '固定列表',
      component: view,
      children: [
        {
          path: '',
          component: page13,
        },
      ],
    },
    {
      path: '/page1-4',
      key: 'page1-4',
      access: true,
      meta: {
        permission: {},
      },
      title: '树状列表',
      component: view,
      children: [
        {
          path: '',
          component: page14,
        },
      ],
    },
    {
      path: '/page1-5',
      key: 'page1-5',
      access: true,
      meta: {
        permission: {},
      },
      title: '多功能列表',
      component: view,
      children: [
        {
          path: '',
          component: page15,
        },
        {
          path: 'import-product',
          component: importProduct,
        },
      ],
    },
  ],
};
