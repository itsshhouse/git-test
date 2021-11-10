import Vue from 'vue';
import HomeController from './Controller';
import HomeVue from './Home.tpl.vue';
import Home from './Home';
import OptionView from '@/generic/OptionView';
import topContainer from './Components/TopContainer.vue';
import deviceStatus from './Components/DeviceStatus.vue';
import order from './Components/Order.vue';
import warning from './Components/Warning.vue';
import turnover from './Components/Turnover.vue';
import turnoverTop from './Components/TurnoverTop.vue';

export default class HomeView extends OptionView<HomeController, Home> {
  constructor() {
    super();
    this.myVue = HomeVue;
  }

  public $components = { topContainer, deviceStatus, order, warning, turnover, turnoverTop };

  public _$mounted(vm: Vue) {}

  public _$activated = () => {};

  public _$created(vm: Vue) {}

  public closeWindow = () => {
    window.close();
  };
}
