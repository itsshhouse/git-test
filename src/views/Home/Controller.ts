import Controller from '@/generic/Controller';
import HomeModel from './Model';
import Home from './Home';
import HomeView from './View';
import moment from 'moment';
import Time from '@/common/timer';

export default class HomeController extends Controller<HomeModel, Home> {
  constructor(_module: Home, _view: HomeView) {
    super(_module, _view);
    this.model = new HomeModel();
  }

  public getData = async () => {
    // 服务总个数
    const serverCount = await this.module.basic.GetCount();
    // api调用总量
    this.model.InterfaceTransferList = await this.module.access.GetCount14();
    this.model.xAxisData = this.model.InterfaceTransferList.map(v => v.requestDate);
    this.model.seriesData = this.model.InterfaceTransferList.map(v => v.visit);
    // 异常
    const unusualCount = await this.module.access.GetCountException({
      startTime: moment()
        .set({ hour: 0, minute: 0, second: 0 })
        .format('yyyy-mm-dd hh:mi:ss'),
      endTime: moment()
        .add(1, 'days')
        .set({ hour: 0, minute: 0, second: 0 })
        .format('yyyy-mm-dd hh:mi:ss'),
    });
    // 平均响应时间
    const avgResponseTime = await this.module.access.GetAvgResponseTime({
      startTime: moment()
        .set({ hour: 0, minute: 0, second: 0 })
        .format('yyyy-mm-dd hh:mi:ss'),
      endTime: moment()
        .add(1, 'days')
        .set({ hour: 0, minute: 0, second: 0 })
        .format('yyyy-mm-dd hh:mi:ss'),
    });
    const interfaceTransferTotal = this.model.InterfaceTransferList[
      this.model.InterfaceTransferList.length - 1
    ].visit;
    this.model.totalState.map((a, i) => {
      switch (i) {
        case 0:
          a.value = serverCount.module_count;
          break;
        case 1:
          a.value = interfaceTransferTotal;
          break;
        case 2:
          a.value = unusualCount.exceptionCount;
          break;
        case 3:
          a.value = avgResponseTime.avgResponseTime;
          break;
        default:
          break;
      }
      return a;
    });
  };

  public GetApiRealTimeData = async () => {
    const data = await this.module.access.GetPerHour({
      timeParam: '2h',
      isSynthesisStatistics: true,
    });
    this.model.apiXAxisData = data[0].value.map(v => v.time.substring(v.time.indexOf(' ') + 1));
    this.model.apiSeriesData = data[0].value.map(v => v.count);
  };
}
