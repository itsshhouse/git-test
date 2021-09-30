import Vue from 'vue';
import LoginController from './Controller';
import LoginVue from './Login.tpl.vue';
import Login from './Login';
import OptionView from '@/generic/OptionView';
import { isEmpty } from 'underscore';

export default class LoginView extends OptionView<LoginController, Login> {
  constructor() {
    super();
    this.myVue = LoginVue;
  }

  public $components = {};

  public _$mounted(vm: Vue) {
    // this.viewVm.$router.push('/Login/home');
    // this.controller.model.breadcrumb = ['home'];
  }

  public _$activated = () => {};

  public _$created(vm: Vue) {}

  public closeWindow = () => {
    window.close();
  };

  public doSubmit = () => {
    this.viewVm.$router.push('/menu');
  };
}
