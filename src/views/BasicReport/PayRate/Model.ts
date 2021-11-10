import { IModel } from '@/generic';

export default class PayRateModel implements IModel {
  public tableModel = {
    no: '序号',
    parking: '停车场名称',
    roadName: '所属道路',
    berth: '泊位数',
    classType: '类区',
    order: '订单总数',
    orderAmount: '订单总金额',
    paid: '已支付',
    unpaid: '未支付',
    payRate: '支付占比',
  };

  public statisticsData = [
    {
      parking: '襄阳北路',
      roadName: '襄阳北路（淮海中路~新乐路）东侧',
      berth: 20,
      classType: '一类区',
      order: 700,
      orderAmount: 400,
      paid: 100,
      unpaid: 100,
      payRate: '100%',
    },
    {
      parking: '襄阳北路',
      roadName: '襄阳北路（淮海中路~新乐路）东侧',
      berth: 20,
      classType: '一类区',
      order: 700,
      orderAmount: 400,
      paid: 100,
      unpaid: 100,
      payRate: '100%',
    },
  ];
}
