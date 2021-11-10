import Vue from 'vue';
import PeriodController from './Controller';
import PeriodVue from './Period.tpl.vue';
import Period from './Period';
import OptionView from '@/generic/OptionView';
import filterTools from './Components/FilterTools.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class PeriodView extends OptionView<PeriodController, Period> {
  constructor() {
    super();
    this.myVue = PeriodVue;
  }

  public $components = { filterTools, baseTable };

  public _$mounted(vm: Vue) {}

  public _$activated = () => {};

  public _$created(vm: Vue) {}

  public closeWindow = () => {
    window.close();
  };

  public exportData = (wb: WorkBook, tableData: any) => {
    if (wb) {
      exportExcel(wb, '订单统计');
    } else {
      exportExcel(tableData, '订单统计');
    }
  };
}
