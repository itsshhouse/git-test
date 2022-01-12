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
      {
        path: '/menu/basicReport/monthlyIncome',
        name: 'monthlyIncome',
        props: {
          its: {
            module: () => import('@/views/BasicReport/MonthlyIncome/MonthlyIncome'),
            controller: () => import('@/views/BasicReport/MonthlyIncome/Controller'),
            view: () => import('@/views/BasicReport/MonthlyIncome/View'),
          },
        },
      },
      {
        path: '/menu/basicReport/detailIncome',
        name: 'detailIncome',
        props: {
          its: {
            module: () => import('@/views/BasicReport/Detail/Detail'),
            controller: () => import('@/views/BasicReport/Detail/Controller'),
            view: () => import('@/views/BasicReport/Detail/View'),
          },
        },
      },
      {
        path: '/menu/basicReport/recover',
        name: 'recover',
        props: {
          its: {
            module: () => import('@/views/BasicReport/Recover/Recover'),
            controller: () => import('@/views/BasicReport/Recover/Controller'),
            view: () => import('@/views/BasicReport/Recover/View'),
          },
        },
      },
      {
        path: '/menu/basicReport/arrears',
        name: 'arrears',
        props: {
          its: {
            module: () => import('@/views/BasicReport/Arrears/Arrears'),
            controller: () => import('@/views/BasicReport/Arrears/Controller'),
            view: () => import('@/views/BasicReport/Arrears/View'),
          },
        },
      },
      {
        path: '/menu/basicReport/payRate',
        name: 'payRate',
        props: {
          its: {
            module: () => import('@/views/BasicReport/PayRate/PayRate'),
            controller: () => import('@/views/BasicReport/PayRate/Controller'),
            view: () => import('@/views/BasicReport/PayRate/View'),
          },
        },
      },
      {
        path: '/menu/basicReport/incomeRecord',
        name: 'incomeRecord',
        props: {
          its: {
            module: () => import('@/views/BasicReport/IncomeRecord/IncomeRecord'),
            controller: () => import('@/views/BasicReport/IncomeRecord/Controller'),
            view: () => import('@/views/BasicReport/IncomeRecord/View'),
          },
        },
      },
      {
        path: '/menu/basicReport/payRecord',
        name: 'payRecord',
        props: {
          its: {
            module: () => import('@/views/BasicReport/PayRecord/PayRecord'),
            controller: () => import('@/views/BasicReport/PayRecord/Controller'),
            view: () => import('@/views/BasicReport/PayRecord/View'),
          },
        },
      },
      {
        path: '/menu/operations/operation',
        name: 'operation',
        props: {
          its: {
            module: () => import('@/views/Operations/Operation/Operation'),
            controller: () => import('@/views/Operations/Operation/Controller'),
            view: () => import('@/views/Operations/Operation/View'),
          },
        },
      },
      {
        path: '/menu/operations/revenue',
        name: 'revenue',
        props: {
          its: {
            module: () => import('@/views/Operations/Revenue/Revenue'),
            controller: () => import('@/views/Operations/Revenue/Controller'),
            view: () => import('@/views/Operations/Revenue/View'),
          },
        },
      },
      {
        path: '/menu/custom/performance',
        name: 'performance',
        props: {
          its: {
            module: () => import('@/views/CustomReport/Performance/Performance'),
            controller: () => import('@/views/CustomReport/Performance/Controller'),
            view: () => import('@/views/CustomReport/Performance/View'),
          },
        },
      },
      {
        path: '/menu/custom/roadToll',
        name: 'roadToll',
        props: {
          its: {
            module: () => import('@/views/CustomReport/RoadToll/RoadToll'),
            controller: () => import('@/views/CustomReport/RoadToll/Controller'),
            view: () => import('@/views/CustomReport/RoadToll/View'),
          },
        },
      },
      {
        path: '/menu/custom/period',
        name: 'period',
        props: {
          its: {
            module: () => import('@/views/CustomReport/Period/Period'),
            controller: () => import('@/views/CustomReport/Period/Controller'),
            view: () => import('@/views/CustomReport/Period/View'),
          },
        },
      },
      {
        path: '/menu/custom/dailySummary',
        name: 'dailySummary',
        props: {
          its: {
            module: () => import('@/views/CustomReport/DailySummary/DailySummary'),
            controller: () => import('@/views/CustomReport/DailySummary/Controller'),
            view: () => import('@/views/CustomReport/DailySummary/View'),
          },
        },
      },
      {
        path: '/menu/warning/bill',
        name: 'bill',
        props: {
          its: {
            module: () => import('@/views/Warning/Bill/Bill'),
            controller: () => import('@/views/Warning/Bill/Controller'),
            view: () => import('@/views/Warning/Bill/View'),
          },
        },
      },
    ],
  },
];
export default routes;
