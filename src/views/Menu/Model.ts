import { IModel } from '@/generic';

export default class MenuModel implements IModel {
  public activeMenu = '/menu/home';

  public breadcrumb: string[] = [];

  public menuNameCN: any = {
    home: '首页',
    financial: '财务管理',
    basic: '基础报表',
    monthlyIncome: '月收入汇总',
    detailIncome: '详细收入统计',
    custom: '定制报表',
    performance: '收费员绩效表',
    employeeFee: '员工收费统计',
  };
}
