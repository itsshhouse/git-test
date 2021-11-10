import { IModel } from '@/generic';

export default class RecoverModel implements IModel {
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
      name: '唐伟敏',
      totalNow: 660,
      totalRecover: 90,
      wechatNow: 2000,
      wechatRecover: 1000,
      aliNow: 700,
      aliRecover: 400,
      otherNow: 100,
      otherRecover: 100,
    },
  ];
}
