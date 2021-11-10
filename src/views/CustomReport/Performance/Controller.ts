import Controller from '@/generic/Controller';
import PerformanceModel from './Model';
import Performance from './Performance';
import PerformanceView from './View';

export default class PerformanceController extends Controller<PerformanceModel, Performance> {
  constructor(_module: Performance, _view: PerformanceView) {
    super(_module, _view);
    this.model = new PerformanceModel();
  }
}
