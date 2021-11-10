import { IModel } from '@/generic';

export default class DetailModel implements IModel {
  public tableModel = {
    region: '所属区域',
    parking: '停车场',
    parkType: '停车场类型',
    total: '收入总额',
    wechat: '微信',
    alipay: '支付宝',
    other: '其它',
    refund: '退款',
  };

  public statisticsData = [
    {
      region: '徐汇区',
      parking: '襄阳北路',
      parkType: '路内停车场',
      total: 2000,
      wechat: 1000,
      alipay: 700,
      other: 400,
      refund: 100,
    },
  ];
}
