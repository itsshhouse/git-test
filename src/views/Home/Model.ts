import { TransferModel } from '@/api/ApiService';
import { IModel } from '@/generic';

export interface TotalStateModel {
  name: string;
  value: number | number[];
}
export default class HomeModel implements IModel {
  public dbChart: TotalStateModel[] = [
    { name: 'BG', value: 1 },
    { name: 'Oracle', value: 1 },
    { name: 'MySQL', value: 1 },
  ];

  public serverChart: any[] = [
    { name: '正常', value: [5, 4], stack: 'server' },
    { name: '离线', value: [2, 1], stack: 'server' },
  ];

  public totalState: TotalStateModel[] = [
    { name: '监测服务(个)', value: 0 },
    { name: '今日调用总量(次)', value: 0 },
    { name: '今日服务异常(次)', value: 0 },
    { name: '平均响应时间(秒)', value: 0 },
  ];

  public serverCount = 0;

  public InterfaceTransferList: TransferModel[] = [];

  public xAxisData: string[] = [];

  public seriesData: number[] = [];

  public unusualCount = 0;

  public avgResponseTime = 0;

  public apiXAxisData: string[] = [];

  public apiSeriesData: number[] = [];

  public warnXAxisData: string[] = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  public warnSeriesData: number[] = [10, 20, 30, 40, 30, 45, 20];

  public warningList: any[] = [
    {
      host: '192.168.100.123',
      tag: 'oracle11g2',
      type: 'oracle',
      message: 'oracle server down',
      datetime: '2021-08-20 11:34:55',
      status: true,
    },
    {
      host: '192.168.100.123',
      tag: 'oracle11g2',
      type: 'oracle',
      message: 'oracle server down',
      datetime: '2021-08-20 11:34:55',
      status: true,
    },
    {
      host: '192.168.100.123',
      tag: 'oracle11g2',
      type: 'oracle',
      message: 'oracle server down',
      datetime: '2021-08-20 11:34:55',
      status: false,
    },
    {
      host: '192.168.100.123',
      tag: 'oracle11g2',
      type: 'oracle',
      message: 'oracle server down',
      datetime: '2021-08-20 11:34:55',
      status: true,
    },
    {
      host: '192.168.100.123',
      tag: 'oracle11g2',
      type: 'oracle',
      message: 'oracle server down',
      datetime: '2021-08-20 11:34:55',
      status: true,
    },
  ];
}
