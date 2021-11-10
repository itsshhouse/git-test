import Controller from '@/generic/Controller';
import RevenueModel from './Model';
import Revenue from './Revenue';
import RevenueView from './View';

export default class RevenueController extends Controller<RevenueModel, Revenue> {
  constructor(_module: Revenue, _view: RevenueView) {
    super(_module, _view);
    this.model = new RevenueModel();
  }
}
