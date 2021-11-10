import Vue from 'vue';
import PayRecordController from './Controller';
import PayRecordVue from './PayRecord.tpl.vue';
import PayRecord from './PayRecord';
import OptionView from '@/generic/OptionView';
import filterTools from './Components/FilterTools.vue';
import summarize from './Components/Summarize.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class PayRecordView extends OptionView<PayRecordController, PayRecord> {
  constructor() {
    super();
    this.myVue = PayRecordVue;
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
