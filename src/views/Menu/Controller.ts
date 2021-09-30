import BaseView from '@/generic/BaseView';
import Controller from '@/generic/Controller';
import MenuModel from './Model';
import Menu from './Menu';

export default class MenuController extends Controller<MenuModel, Menu> {
  constructor(_module: Menu, _view: BaseView) {
    super(_module, _view);
    this.model = new MenuModel();
  }
}
