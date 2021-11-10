import { IModel } from '@/generic';

export default class DailySummaryModel implements IModel {
  public tableModel = {
    no: '序号',
    company: '员工编号',
    parking: '员工姓名',
    parkType: '停车场编号',
    berth: '停车场',
    normal: '首付总金额',
    real: '补费总金额',
    arrears: '付费总金额',
    normalBerth: '白天付费总金额',
    realBerth: '晚上付费总金额',
    avgRate: '停车次数',
    day: '白天停车次数',
    night: '晚上停车次数',
    oneHour: '停1小时车次',
    twoHour: '停1-2小时车次',
    overTwoHour: '停2小时以上车次',
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
    },
  ];
}
