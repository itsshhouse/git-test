import { IModel } from '@/generic';
import moment from 'moment';

export default class RevenueModel implements IModel {
  public companys: { [x: string]: any }[] = [
    {
      value: 'shznjt',
      label: '上海智能交通有限公司',
    },
  ];

  public company = '';

  public dateTime = [
    moment().startOf('day'),
    moment()
      .add(1, 'day')
      .startOf('day'),
  ];

  public maxPickerDate = moment()
    .add(1, 'day')
    .startOf('day');

  public tableModel = {
    company: '所属公司',
    date: '日期',
    total: '日订单金额',
    paid: '日实收金额',
    arrears: '日欠费金额',
    singlePrice: '日客单价',
    recover: '日追缴金额',
    wechat: '日微信支付订单金额',
    alipay: '日支付宝支付订单金额',
  };

  public tableData = [
    {
      company: '上海智能交通有限公司',
      date: '2021-10-25',
      total: 1652,
      paid: 857,
      arrears: 234,
      singlePrice: 15,
      recover: 432,
      wechat: 432,
      alipay: 425,
    },
  ];
}
