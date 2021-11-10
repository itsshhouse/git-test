import Controller from '@/generic/Controller';
import DetailModel from './Model';
import Detail from './Detail';
import DetailView from './View';

export default class DetailController extends Controller<DetailModel, Detail> {
  constructor(_module: Detail, _view: DetailView) {
    super(_module, _view);
    this.model = new DetailModel();
  }
}
