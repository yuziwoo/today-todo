import { CompiledTaskProps } from './todo';

export type CalendarDateProps = {
  year: number;
  month: number;
  day: number;
};

export type CalendarYearMonthProps = Pick<CalendarDateProps, 'year' | 'month'>;

export type DateInfoProps = {
  day: number;
  restDay: null | boolean;
  dateName?: string;
  todo?: undefined | CompiledTaskProps[]
};

export type MonthArray = DateInfoProps[];

export type RestDayInfoTypes = {
  dateKind: string;
  dateName: string;
  isHoliday: 'Y' | 'N';
  locdate: number;
  seq: number;
};

export type RestDayInfosTypes = undefined | RestDayInfoTypes | RestDayInfoTypes[];
