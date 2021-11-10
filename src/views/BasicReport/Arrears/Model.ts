import { IModel } from '@/generic';

export default class ArrearsModel implements IModel {
  public tableModel = {
    company: '所属公司',
    parking: '停车场',
    parkType: '停车场类型',
    berth: '泊位数',
    normal: '应收总金额',
    real: '实收总金额',
    arrears: '欠费总金额',
    normalBerth: '单泊位应收',
    realBerth: '单泊位实收',
    avgRate: '平均缴费率',
  };

  public statisticsData = [
    {
      company: '徐汇区',
      parking: '襄阳北路',
      parkType: '路内停车场',
      berth: 200,
      normal: 1000,
      real: 700,
      arrears: 400,
      normalBerth: 100,
      realBerth: 100,
      avgRate: 100,
    },
    {
      company: '徐汇区',
      parking: '襄阳北路',
      parkType: '路内停车场',
      berth: 200,
      normal: 1000,
      real: 700,
      arrears: 400,
      normalBerth: 100,
      realBerth: 100,
      avgRate: 100,
    },
  ];
}
