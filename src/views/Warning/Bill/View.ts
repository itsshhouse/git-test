import Vue from 'vue';
import BillController from './Controller';
import BillVue from './Bill.tpl.vue';
import Bill from './Bill';
import OptionView from '@/generic/OptionView';
import moment from 'moment';
import summarize from './Components/Summarize.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class BillView extends OptionView<BillController, Bill> {
  constructor() {
    super();
    this.myVue = BillVue;
  }

  public $components = { summarize, baseTable };

  public _$mounted(vm: Vue) {}

  public _$activated = () => {};

  public _$created(vm: Vue) {}

  public closeWindow = () => {
    window.close();
  };

  public $computed = {
    pickerOptions() {
      return {
        disabledDate: (date: any) =>
          date >
          moment()
            .add(1, 'day')
            .startOf('day'),
      };
    },
  };

  public exportData = (wb: WorkBook, tableData: any) => {
    if (wb) {
      exportExcel(wb, '订单统计');
    } else {
      exportExcel(tableData, '订单统计');
    }
  };

  public settingOpen(name: string) {
    if (name === '总票据数') {
      this.controller.model.totalBillVisible = true;
    } else {
      this.controller.model.remainBillVisible = true;
    }
  }
}
