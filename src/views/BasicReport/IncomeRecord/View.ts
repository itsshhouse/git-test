import Vue from 'vue';
import IncomeRecordController from './Controller';
import IncomeRecordVue from './IncomeRecord.tpl.vue';
import IncomeRecord from './IncomeRecord';
import OptionView from '@/generic/OptionView';
import filterTools from './Components/FilterTools.vue';
import summarize from './Components/Summarize.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class IncomeRecordView extends OptionView<IncomeRecordController, IncomeRecord> {
  constructor() {
    super();
    this.myVue = IncomeRecordVue;
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
