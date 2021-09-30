import moment from 'moment';

/**
 * 静态变量 Static Variable
 */
export const TimeFormat = 'HH:mm:ss';
export const DateFormat = 'YYYY-MM-DD';
export const DTFormat = `${DateFormat} ${TimeFormat}`;

export default class Time {
  static toString(date: Date, formatter?: string) {
    return moment(date)
      .utc()
      .format(formatter);
  }

  static toDate(date: string, formatter?: string) {
    return moment(date, formatter)
      .utc()
      .toDate();
  }
}
