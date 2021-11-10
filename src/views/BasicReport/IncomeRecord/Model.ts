import { IModel } from '@/generic';

export default class IncomeRecordModel implements IModel {
  public tableModel = {
    no: '序号',
    company: '运营公司',
    dealNo: '交易编号',
    orderNo: '订单号',
    plateNo: '车牌号',
    plateColor: '车牌颜色',
    normalPay: '应付金额',
    paid: '支付金额',
    payType: '支付渠道',
    feeType: '费用类型',
    payTime: '支付时间',
  };

  public statisticsData = [
    {
      company: '上海智能交通有限公司',
      dealNo: '19273526',
      orderNo: 'DC00102727819',
      plateNo: '沪DWL190',
      plateColor: '蓝色',
      normalPay: 15.0,
      paid: 15.0,
      payType: '微信支付',
      feeType: '停车费',
      payTime: '2021-09-09 13:01:12',
    },
  ];
}
