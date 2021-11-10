import Vue from 'vue';
import PerformanceController from './Controller';
import PerformanceVue from './Performance.tpl.vue';
import Performance from './Performance';
import OptionView from '@/generic/OptionView';
import filterTools from './Components/FilterTools.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class PerformanceView extends OptionView<PerformanceController, Performance> {
  constructor() {
    super();
    this.myVue = PerformanceVue;
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
