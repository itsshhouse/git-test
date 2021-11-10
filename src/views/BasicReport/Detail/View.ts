import Vue from 'vue';
import DetailController from './Controller';
import DetailVue from './Detail.tpl.vue';
import Detail from './Detail';
import OptionView from '@/generic/OptionView';
import filterTools from './Components/FilterTools.vue';
import summarize from './Components/Summarize.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class DetailView extends OptionView<DetailController, Detail> {
  constructor() {
    super();
    this.myVue = DetailVue;
  }

  public $components = { filterTools, summarize, baseTable };

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
