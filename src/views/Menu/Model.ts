import { IModel } from '@/generic';

export default class MenuModel implements IModel {
  public activeMenu = '/menu/home';

  public breadcrumb: string[] = [];

  // public menuList = [
  //   { label: '首页', value: 'home' },
  //   {
  //     label: '运营分析',
  //     value: 'operations',
  //   },
  //   {
  //     label: '基础报表',
  //     value: 'basicReport',
  //   },

  //   {
  //     label: '定制报表',
  //     value: ' custom',
  //   },
  // ];

  public menus = {
    operations: [
      { label: '每日运营统计', value: 'operation' },
      { label: '每日营收数据', value: 'revenue' },
    ],
    basicReport: [
      { label: '月收入汇总', value: 'monthlyIncome' },
      { label: '详细收入统计', value: 'detailIncome' },
      { label: '收费员追缴表', value: 'recover' },
      { label: '车场欠费统计', value: 'arrears' },
      { label: '支付占比统计', value: 'payRate' },
      { label: '收入记录确认', value: 'incomeRecord' },
      { label: '支付记录确认', value: 'payRecord' },
    ],
    custom: [
      { label: '收费员绩效表', value: 'performance' },
      { label: '员工收费统计', value: 'employeeFee' },
      { label: '路段收费统计', value: 'roadToll' },
      { label: '员工时间段汇总', value: 'period' },
      { label: '员工日汇总信息', value: 'dailySummary' },
    ],
  };

  public menuNameCN: any = {
    home: '首页',
    financial: '财务管理',
    basicReport: '基础报表',
    monthlyIncome: '月收入汇总',
    detailIncome: '详细收入统计',
    recover: '收费员追缴表',
    arrears: '车场欠费统计',
    payRate: '支付占比统计',
    incomeRecord: '收入记录确认',
    payRecord: '支付记录确认',
    custom: '定制报表',
    performance: '收费员绩效表',
    employeeFee: '员工收费统计',
    operations: '运营分析',
    operation: '每日运营统计',
    revenue: '每日营收数据',
    roadToll: '路段收费统计',
    period: '员工时间段汇总',
    dailySummary: '员工日汇总信息',
  };
}
