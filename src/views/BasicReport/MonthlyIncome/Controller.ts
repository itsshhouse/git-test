import Controller from '@/generic/Controller';
import MonthlyIncome from './Model';
import BasicReport from './MonthlyIncome';
import BasicReportView from './View';

export default class BasicReportController extends Controller<MonthlyIncome, BasicReport> {
  constructor(_module: BasicReport, _view: BasicReportView) {
    super(_module, _view);
    this.model = new MonthlyIncome();
  }
}
