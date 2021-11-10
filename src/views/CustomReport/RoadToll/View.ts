import Vue from 'vue';
import RoadTollController from './Controller';
import RoadTollVue from './RoadToll.tpl.vue';
import RoadToll from './RoadToll';
import OptionView from '@/generic/OptionView';
import filterTools from './Components/FilterTools.vue';
import baseTable from '@/template/VueTemplate/BaseTable.vue';
import { WorkBook } from 'xlsx';
import exportExcel from '@/components/ExcelAction/ExportExcel';

export default class RoadTollView extends OptionView<RoadTollController, RoadToll> {
  constructor() {
    super();
    this.myVue = RoadTollVue;
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
