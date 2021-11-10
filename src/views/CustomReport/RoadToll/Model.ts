import { IModel } from '@/generic';

export default class RoadTollModel implements IModel {
  public tableModel = {
    no: '序号',
    company: '路段',
    parking: '核定泊位数',
    parkType: '停放车次',
    berth: '停放1小时以内车次',
    normal: '停放1-2小时车次',
    real: '白天停放车次',
    arrears: '夜间停放车次',
    normalBerth: '超时拒补停车车次',
    realBerth: '拒付停车费车次',
    avgRate: '合计',
    day: '白天',
    night: '夜间',
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
