import Controller from '@/generic/Controller';
import DailyAverageModel from './Model';
import DailyAverage from './DailyAverage';
import DailyAverageView from './View';

export default class DailyAverageController extends Controller<DailyAverageModel, DailyAverage> {
  constructor(_module: DailyAverage, _view: DailyAverageView) {
    super(_module, _view);
    this.model = new DailyAverageModel();
  }
}
