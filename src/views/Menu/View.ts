import Vue from 'vue';
import MenuController from './Controller';
import MenuVue from './Menu.tpl.vue';
import Menu from './Menu';
import OptionView from '@/generic/OptionView';
import { isEmpty } from 'underscore';

export default class MenuView extends OptionView<MenuController, Menu> {
  constructor() {
    super();
    this.myVue = MenuVue;
  }

  public $components = {};

  public _$mounted(vm: Vue) {
    vm.$router.push('/menu/home');
    this.controller.model.breadcrumb = ['home'];
  }

  public _$activated = () => {};

  public _$created(vm: Vue) {}

  public closeWindow = () => {
    window.close();
  };

  public $computed = {
    appTitle() {
      return process.env.VUE_APP_TITLE;
    },
  };

  public handleSelect = (key: string, keyPath?: string) => {
    if (!isEmpty(key) && this.viewVm.$route.path !== key) {
      this.controller.model.activeMenu = key;
      this.viewVm.$router.push(key);
      console.log('path :', this.viewVm.$route.path);
      this.controller.model.breadcrumb = key.replace('/menu/', '').split('/');
    }
  };
}
