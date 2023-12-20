import { Tasks } from './todo';

export type BasicMonthData = {
  year: number;
  month: number;
};

export type DetailedMonthData = BasicMonthData & {
  day: number;
  maximumDate: number;
};

export type BasicTodoData = {
  id: number;
  works: string;
  complete: boolean;
  repeat: boolean;
};

type BasicOneDayData = {
  day: number;
};

export type RestDayData = BasicOneDayData & {
  restDay: null | boolean;
  dateName: null | string;
};

export type OneDayData = RestDayData & {
  todo: BasicTodoData[];
};

export type CalendarDataType = BasicMonthData & {
  datas: OneDayData[];
};

export type RestDayPayloadData = BasicMonthData & {
  data: RestDayData[][];
  todo: Tasks;
};

export type PublicRestDayData = {
  dateKind: string;
  dateName: string;
  isHoliday: 'Y' | 'N';
  locdate: number;
  seq: number;
};
