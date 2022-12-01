import moment from 'moment';

const DAYS = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

export class DateTimeUtil {
  static toString(date: Date): string {
    return moment(date).format('YYYY-MM-DD-HH:MM-') + DAYS[date.getDay()];
  }
}
