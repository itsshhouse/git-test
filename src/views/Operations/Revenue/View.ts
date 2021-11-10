import Vue from 'vue';
import RevenueController from './Controller';
import RevenueVue from './Revenue.tpl.vue';
import Revenue from './Revenue';
import OptionView from '@/generic/OptionView';
import statistics from './Components/Statistics.vue';
import moment from 'moment';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class RevenueView extends OptionView<RevenueController, Revenue> {
  constructor() {
    super();
    this.myVue = RevenueVue;
  }

  public $components = { statistics, baseTable };

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
      exportExcel(wb, '营收统计');
    } else {
      exportExcel(tableData, '营收统计');
    }
  };
}
