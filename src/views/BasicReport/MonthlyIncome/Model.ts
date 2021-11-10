import { IModel } from '@/generic';
import moment from 'moment';

export default class MonthlyIncomeModel implements IModel {
  public companys: { [x: string]: any }[] = [
    {
      value: 'shznjt',
      label: '上海智能交通有限公司',
    },
  ];

  public company = '';

  public dateTime = moment().startOf('month');
}
