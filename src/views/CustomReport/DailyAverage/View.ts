import Vue from 'vue';
import DailyAverageController from './Controller';
import DailyAverageVue from './DailyAverage.tpl.vue';
import DailyAverage from './DailyAverage';
import OptionView from '@/generic/OptionView';
import filterTools from './Components/FilterTools.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class DailyAverageView extends OptionView<DailyAverageController, DailyAverage> {
  constructor() {
    super();
    this.myVue = DailyAverageVue;
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
