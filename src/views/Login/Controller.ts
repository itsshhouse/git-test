import BaseView from '@/generic/BaseView';
import Controller from '@/generic/Controller';
import LoginModel from './Model';
import Login from './Login';

export default class LoginController extends Controller<LoginModel, Login> {
  constructor(_module: Login, _view: BaseView) {
    super(_module, _view);
    this.model = new LoginModel();
  }
}
