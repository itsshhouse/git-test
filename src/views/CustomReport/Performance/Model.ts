import { IModel } from '@/generic';

export default class PerformanceModel implements IModel {
  public tableModel = {
    no: '序号',
    company: '管理员编号',
    parking: '姓名',
    parkType: '订单总数',
    berth: '订单总金额',
    normal: '未支付',
    real: 'APP支付',
    arrears: '扫码支付',
    normalBerth: '追缴金额',
    realBerth: '合计',
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
