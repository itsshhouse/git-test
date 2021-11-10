import { IModel } from '@/generic';

export default class PayRecordModel implements IModel {
  public tableModel = {
    no: '序号',
    company: '入账公司',
    dealNo: '交易编号',
    dealType: '交易类型',
    payType: '支付类型',
    payWay: '支付方式',
    payChannel: '支付渠道',
    myMark: '我方标识',
    otherMark: '对方标识',
    applyTime: '申请时间',
    payAmount: '支付金额',
    remark: '备注',
    customSetting: { label: '操作', actions: ['支付明细'] },
  };

  public statisticsData = [
    {
      company: '上海智能交通有限公司',
      dealNo: '19273526',
      dealType: '停车订单',
      payType: '支付',
      payWay: '扫PAD支付二维码',
      payChannel: '微信支付',
      myMark: '20281739013761551983726',
      otherMark: '20281739013761551983726',
      applyTime: '2021-09-09 13:01:12',
      payAmount: 15.0,
      remark: '备注',
    },
  ];
}
