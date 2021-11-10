import Controller from '@/generic/Controller';
import OperationModel from './Model';
import Operation from './Operation';
import OperationView from './View';

export default class OperationController extends Controller<OperationModel, Operation> {
  constructor(_module: Operation, _view: OperationView) {
    super(_module, _view);
    this.model = new OperationModel();
  }
}
