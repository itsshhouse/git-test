import Controller from '@/generic/Controller';
import IncomeRecordModel from './Model';
import IncomeRecord from './IncomeRecord';
import IncomeRecordView from './View';

export default class IncomeRecordController extends Controller<IncomeRecordModel, IncomeRecord> {
  constructor(_module: IncomeRecord, _view: IncomeRecordView) {
    super(_module, _view);
    this.model = new IncomeRecordModel();
  }
}
