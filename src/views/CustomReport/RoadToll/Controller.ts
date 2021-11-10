import Controller from '@/generic/Controller';
import RoadTollModel from './Model';
import RoadToll from './RoadToll';
import RoadTollView from './View';

export default class RoadTollController extends Controller<RoadTollModel, RoadToll> {
  constructor(_module: RoadToll, _view: RoadTollView) {
    super(_module, _view);
    this.model = new RoadTollModel();
  }
}
