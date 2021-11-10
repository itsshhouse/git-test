import { IModel } from '@/generic';
import moment from 'moment';

export default class OperationModel implements IModel {
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
    total: '日订单总量',
    turnover: '平台周转率',
    pay: '已支付订单',
    arrears: '欠费订单',
    payRate: '订单日内支付率',
    arrearsRate: '订单日内缴费率',
    payRateAvg: '订单日内支付率历史平均',
    arrearsRateAvg: '订单日内缴费率历史平均',
    wechat: '日微信支付记录笔数',
    alipay: '日支付宝支付记录笔数',
  };

  public statisticsData = [
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1001,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 2,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 3,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 4,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 5,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 6,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 7,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 8,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 9,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 10,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 11,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 12,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 13,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 14,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 15,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 16,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 17,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 18,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 19,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 20,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 21,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 22,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
  ];
}
