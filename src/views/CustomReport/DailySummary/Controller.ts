import Controller from '@/generic/Controller';
import DailySummaryModel from './Model';
import DailySummary from './DailySummary';
import DailySummaryView from './View';

export default class DailySummaryController extends Controller<DailySummaryModel, DailySummary> {
  constructor(_module: DailySummary, _view: DailySummaryView) {
    super(_module, _view);
    this.model = new DailySummaryModel();
  }
}
