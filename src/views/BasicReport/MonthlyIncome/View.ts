import Vue from 'vue';
import MonthlyIncomeController from './Controller';
import MonthlyIncomeVue from './MonthlyIncome.tpl.vue';
import MonthlyIncome from './MonthlyIncome';
import OptionView from '@/generic/OptionView';
import moment from 'moment';
import order from './Components/Order.vue';
import orderDetail from './Components/OrderDetail.vue';
import feeHistory from './Components/FeeHistory.vue';
import charge from './Components/Charge.vue';

export default class MonthlyIncomeView extends OptionView<MonthlyIncomeController, MonthlyIncome> {
  constructor() {
    super();
    this.myVue = MonthlyIncomeVue;
  }

  public $components = { order, orderDetail, feeHistory, charge };

  public _$mounted(vm: Vue) {}

  public _$activated = () => {};

  public _$created(vm: Vue) {}

  public closeWindow = () => {
    window.close();
  };

  public $computed = {
    pickerOptions() {
      return {
        disabledDate: (date: any) => date > moment().startOf('month'),
      };
    },
  };
}
