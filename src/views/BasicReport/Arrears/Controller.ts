import Controller from '@/generic/Controller';
import ArrearsModel from './Model';
import Arrears from './Arrears';
import ArrearsView from './View';

export default class ArrearsController extends Controller<ArrearsModel, Arrears> {
  constructor(_module: Arrears, _view: ArrearsView) {
    super(_module, _view);
    this.model = new ArrearsModel();
  }
}
