import Vue from 'vue';
import DailySummaryController from './Controller';
import DailySummaryVue from './DailySummary.tpl.vue';
import DailySummary from './DailySummary';
import OptionView from '@/generic/OptionView';
import filterTools from './Components/FilterTools.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class DailySummaryView extends OptionView<DailySummaryController, DailySummary> {
  constructor() {
    super();
    this.myVue = DailySummaryVue;
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
