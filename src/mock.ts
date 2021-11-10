import Mock from 'mockjs';
import moment from 'moment';

Mock.mock('http://localhost:8080/AccidentModule/getProjectTree', 'get', [
  {
    company: '上海智能交通有限公司',
    date: moment(),
    'total|500-1000': 1000,
    'turnover|1-10.1-10': 5.4,
    pay: 650,
    arrears: 350,
    payRate: '65%',
    arrearsRate: '65%',
    payRateAvg: '65%',
    arrearsRateAvg: '65%',
    wechat: '300',
    alipay: '300',
  },
]);
