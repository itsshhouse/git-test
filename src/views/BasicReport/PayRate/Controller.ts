import Controller from '@/generic/Controller';
import PayRateModel from './Model';
import PayRate from './PayRate';
import PayRateView from './View';

export default class PayRateController extends Controller<PayRateModel, PayRate> {
  constructor(_module: PayRate, _view: PayRateView) {
    super(_module, _view);
    this.model = new PayRateModel();
  }
}
