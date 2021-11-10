import Vue from 'vue';
import OperationController from './Controller';
import OperationVue from './Operation.tpl.vue';
import Operation from './Operation';
import OptionView from '@/generic/OptionView';
import moment from 'moment';
import summarize from './Components/Summarize.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class OperationView extends OptionView<OperationController, Operation> {
  constructor() {
    super();
    this.myVue = OperationVue;
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
}
