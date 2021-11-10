import Controller from '@/generic/Controller';
import PeriodModel from './Model';
import Period from './Period';
import PeriodView from './View';

export default class PeriodController extends Controller<PeriodModel, Period> {
  constructor(_module: Period, _view: PeriodView) {
    super(_module, _view);
    this.model = new PeriodModel();
  }
}
