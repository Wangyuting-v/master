const router = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: '广告管理',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/dancer',
            name: '投票管理',
            icon: 'heart',
            routes: [
              {
                path: '/dancer/manager',
                name: '投票列表',
                component: './Dance',
              },
              {
                path: '/dancer/detail',
                name: '投票详情',
                component: './DanceDetail',
                hideInMenu: true,
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
export default router;
