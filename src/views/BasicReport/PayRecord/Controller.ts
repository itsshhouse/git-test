import Controller from '@/generic/Controller';
import PayRecordModel from './Model';
import PayRecord from './PayRecord';
import PayRecordView from './View';

export default class PayRecordController extends Controller<PayRecordModel, PayRecord> {
  constructor(_module: PayRecord, _view: PayRecordView) {
    super(_module, _view);
    this.model = new PayRecordModel();
  }
}
