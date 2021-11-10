import { IModel } from '@/generic';

export default class DailyAverageModel implements IModel {
  public tableModel = {
    no: '序号',
    company: '员工编号',
    parking: '员工姓名',
    parkType: '停车场编号',
    berth: '停车场',
    normal: '收费',
    real: '出勤',
    arrears: '日均收费',
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
