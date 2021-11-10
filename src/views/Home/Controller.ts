import Controller from '@/generic/Controller';
import HomeModel from './Model';
import Home from './Home';
import HomeView from './View';
import moment from 'moment';
import Time from '@/common/timer';

export default class HomeController extends Controller<HomeModel, Home> {
  constructor(_module: Home, _view: HomeView) {
    super(_module, _view);
    this.model = new HomeModel();
  }
}
