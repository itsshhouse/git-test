import Controller from '@/generic/Controller';
import RecoverModel from './Model';
import Recover from './Recover';
import RecoverView from './View';

export default class RecoverController extends Controller<RecoverModel, Recover> {
  constructor(_module: Recover, _view: RecoverView) {
    super(_module, _view);
    this.model = new RecoverModel();
  }
}
