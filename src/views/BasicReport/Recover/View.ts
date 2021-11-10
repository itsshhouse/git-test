import Vue from 'vue';
import RecoverController from './Controller';
import RecoverVue from './Recover.tpl.vue';
import Recover from './Recover';
import OptionView from '@/generic/OptionView';
import filterTools from './Components/FilterTools.vue';
import summarize from './Components/Summarize.vue';
import recoverTable from './Components/RecoverTable.vue';
import exportExcel from '@/components/ExcelAction/ExportExcel';
import { WorkBook } from 'xlsx';

export default class RecoverView extends OptionView<RecoverController, Recover> {
  constructor() {
    super();
    this.myVue = RecoverVue;
  }

  public $components = { filterTools, summarize, recoverTable };

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
