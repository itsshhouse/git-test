import Controller from '@/generic/Controller';
import BillModel from './Model';
import Bill from './Bill';
import BillView from './View';

export default class BillController extends Controller<BillModel, Bill> {
  constructor(_module: Bill, _view: BillView) {
    super(_module, _view);
    this.model = new BillModel();
  }
}
