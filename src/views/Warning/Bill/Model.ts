import { IModel } from '@/generic';
import moment from 'moment';

export default class BillModel implements IModel {
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
    manageCode: '协管单位执收码',
    manageName: '协管单位名称',
    dataDate: '日期',
    remainNum: '剩余票据',
    beginBillNumber: '当前可用开始票据',
    endBillNumber: '当前可用结束票据',
  };

  public statisticsData = [
    {
      incId: 1,
      yearId: 2021,
      billLimit: 100000,
      manageCode: 'XH-2021001117',
      manageName: '上海智能交通',
      dataDate: '2021-09-10',
      remainNum: 100000,
      beginBillNumber: '9000062254',
      endBillNumber: '9000063000',
    },
    {
      incId: 2,
      yearId: 2021,
      billLimit: 100000,
      manageCode: 'XH-2021001117',
      manageName: '上海智能交通',
      dataDate: '2021-09-11',
      remainNum: 80000,
      beginBillNumber: '9000062254',
      endBillNumber: '9000063000',
    },
  ];

  public totalBillVisible = false;

  public remainBillVisible = false;
}
