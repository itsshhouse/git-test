import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    props: {
      its: {
        module: () => import('@/views/Login/Login'),
        controller: () => import('@/views/Login/Controller'),
        view: () => import('@/views/Login/View'),
      },
    },
  },
  {
    path: '/menu',
    name: 'menu',
    props: {
      its: {
        module: () => import('@/views/Menu/Menu'),
        controller: () => import('@/views/Menu/Controller'),
        view: () => import('@/views/Menu/View'),
      },
    },
    children: [
      {
        path: '/menu/home',
        name: 'home',
        props: {
          its: {
            module: () => import('@/views/Home/Home'),
            controller: () => import('@/views/Home/Controller'),
            view: () => import('@/views/Home/View'),
          },
        },
      },
    ],
  },
];
export default routes;
